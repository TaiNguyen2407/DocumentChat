from flask import Flask, jsonify, request
from flask_cors import CORS
from database.models import db, Message
from gpt4all import GPT4All
from langchain.document_loaders import PyPDFLoader
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import LlamaCppEmbeddings
from langchain.vectorstores.faiss import FAISS
from langchain.llms import LlamaCpp
from logic.utils import generate_answer_from_chat_model, split_chunks, create_index, replace_folder_if_exists, generate_answer_from_loaded_document


app = Flask(__name__)
CORS(app)

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///chat_history.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app.config.from_object(Config)

db.init_app(app)

@app.before_request
def before_first_request():
    if not getattr(app, '_database_initialized', False):
        with app.app_context():
            db.create_all()
            app._database_initialized = True


data = []
app.config['UPLOAD_FOLDER'] = './docs'
ALLOWED_EXTENSIONS = 'pdf'
local_index_folder = 'document_index'
llama_2_7b_chat_path = './models/llama-2-7b-chat.ggmlv3.q2_K.bin'

chat_model = "orca-mini-3b-gguf2-q4_0.gguf"
model = GPT4All(model_name=chat_model)


@app.route('/')
def chat():
    return "hello world"


@app.route('/api/chat-history', methods=["GET"])
def chat_history():
    chat_id = request.args.get("chat-id")
    username = request.headers.get("Username")

    base_query = Message.query.filter_by(session=chat_id)

    if username:
        base_query = base_query.filter_by(username=username)

    messages = base_query.all()

    data = [msg.to_dict() for msg in messages]
    return jsonify(data)


@app.route('/api/chat/all-messages', methods=["GET"])
def chat_history_document():
    return data


@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    question_from_frontend = request.json["question"]
    chat_id = request.args.get("chat-id")

    username = request.headers.get("Username")

    conversation_history = Message.query.filter_by(session=chat_id, username=username).all()

    response = generate_answer_from_chat_model(model, question_from_frontend, conversation_history)

    chat_user = Message(sender="user", content=question_from_frontend, session=chat_id, username=username)
    chat_bot = Message(sender="assistant", content=response, session=chat_id, username=username)

    db.session.add(chat_user)
    db.session.add(chat_bot)
    db.session.commit()

    return jsonify(chat_bot.to_dict())


def allowed_file(filename):
    return '.' in filename and \
           filename.split('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_index_for_uploaded_document(file) -> FAISS:
    loader = PyPDFLoader(app.config['UPLOAD_FOLDER'] + '/' + file.filename)
    docs = loader.load()
    chunks = split_chunks(docs)
    embeddings = LlamaCppEmbeddings(model_path=llama_2_7b_chat_path)
    index = create_index(chunks, embeddings)
    return index


def save_index_to_local_folder(index: FAISS, local_index_folder_path: str):
    replace_folder_if_exists(local_index_folder_path)
    index.save_local(folder_path=local_index_folder_path)


@app.route('/api/upload/upload-document', methods=["POST"])
def handle_upload_file():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == '':
        return 'No selected file'

    if file and allowed_file(file.filename): 
        file.save(app.config['UPLOAD_FOLDER'] + '/' + file.filename)
        index = create_index_for_uploaded_document(file)
        save_index_to_local_folder(index, local_index_folder_path=local_index_folder)
        return 'File uploaded successfully'

    return 'File not allowed'
    

def init_llama_model() -> LlamaCpp:
    callback_manager = CallbackManager([StreamingStdOutCallbackHandler])
    llm = LlamaCpp(
        model_path=llama_2_7b_chat_path, 
        input={
            "temperature": 0,
            "max_length": 2048,
            "top_p": 1
        },
        n_ctx=2048,
        callback_manager=callback_manager,
        verbose=False
    )   
    return llm


template = """
Please use the following context to answer questions.
Context: {context}
---
Question: {question}
Answer: Let's think step by step.
"""


@app.route('/api/chat/document-chat', methods=["POST"])
def chat_with_document():
    question_from_frontend = request.json["question"]

    embeddings = LlamaCppEmbeddings(model_path=llama_2_7b_chat_path)
    response = generate_answer_from_loaded_document(local_index_folder, embeddings, question_from_frontend, template, init_llama_model())

    data_to_send_back = {"sender" : "assistant", "content" : response}
    chat_user = {"sender" : "user", "content" : question_from_frontend}

    chat_bot = data_to_send_back

    data.append(chat_user)
    data.append(chat_bot)

    return jsonify(data_to_send_back)

if __name__ == "__main__":
    app.run(debug=True)