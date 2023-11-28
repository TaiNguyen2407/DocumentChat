from flask import Flask, jsonify, request
from flask_cors import CORS
from database.models import db, Message
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/chat_history.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat_history.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

data = []

chat_model = "orca-mini-3b-gguf2-q4_0.gguf"
model = GPT4All(model_name=chat_model)

@app.route('/')
def chat():
    print("hello world")

    
def generate_answer_from_chat_model(question: str, conversation_history: list, temp: int = 0):
    context = " ".join([msg.content for msg in conversation_history])

    with model.chat_session():
        return model.generate(prompt=f"{context}\nUser: {question}", temp=temp)
    

@app.route('/api/chat/all-messages', methods=["GET"])
def chat_history():
    messages = Message.query.all()
    data = [{"sender": msg.sender, "content": msg.content} for msg in messages]
    return jsonify(data)

def message_to_dict(message):
    return {"sender": message.sender, "content": message.content}


@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    question_from_frontend = request.json["question"]
    conversation_history = Message.query.all()

    response = generate_answer_from_chat_model(question_from_frontend, conversation_history)
    print(response)

    chat_user = Message(sender="user", content=question_from_frontend)
    chat_bot = Message(sender="assistant", content=response)

    db.session.add(chat_user)
    db.session.add(chat_bot)
    db.session.commit()

    chat_bot_dict = message_to_dict(chat_bot)

    return jsonify(chat_bot_dict)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)