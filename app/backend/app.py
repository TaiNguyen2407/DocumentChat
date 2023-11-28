from flask import Flask, jsonify, request
from flask_cors import CORS
from gpt4all import GPT4All
from langchain.document_loaders import PyPDFLoader
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import LlamaCppEmbeddings
from langchain.text_splitter import  RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import LlamaCpp
from logic.utils import generate_answer_from_chat_model, split_chunks, similarity_search, create_index, save_index_to_local_folder, load_index_from_local


app = Flask(__name__)
CORS(app)

data = []

chat_model = "orca-mini-3b-gguf2-q4_0.gguf"
model = GPT4All(model_name=chat_model)

@app.route('/')
def chat():
    return "hello world"

    

@app.route('/api/chat/all-messages', methods=["GET"])
def chat_history():
    return data
    

@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    question_from_frontend = request.json["question"]
    response = generate_answer_from_chat_model(model, question_from_frontend, data)
    print(response)
    data_to_send_back = {"sender" : "assistant", "content" : response}
    chat_user = {"sender" : "user", "content" : question_from_frontend}
    chat_bot = data_to_send_back
    data.append(chat_user)
    data.append(chat_bot)
    return jsonify(data_to_send_back)


llama_2_7b_chat_path = 'models/llama-2-7b-chat.ggmlv3.q2_K.bin'

callback_manager = CallbackManager([StreamingStdOutCallbackHandler])
loader = PyPDFLoader('path to pdf file')
embeddings = LlamaCppEmbeddings(model_path=llama_2_7b_chat_path)
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

# Create Index
docs = loader.load()
chunks = split_chunks(docs)
index = create_index(chunks)

# Save Index (use this to save the index for later use)
# Comment the line below after running once successfully (IMPORTANT)

#save_index_to_local_folder(index, 'path to index folder')
index.save_local('text_index')

index = FAISS.load_local("./text_index", embeddings)

# Set your query here manually
question = "Summarize the article"
matched_docs, sources = similarity_search(question, index)

template = """
Please use the following context to answer questions.
Context: {context}
---
Question: {question}
Answer: Let's think step by step."""

context = "\n".join([doc.page_content for doc in matched_docs])
prompt = PromptTemplate(template=template, input_variables=["context", "question"]).partial(context=context)
llm_chain = LLMChain(prompt=prompt, llm=llm)

print(llm_chain.run(question))





if __name__ == "__main__":
    app.run(debug=True)


