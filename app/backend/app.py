from flask import Flask, jsonify, request
from flask_cors import CORS
from database.models import db, Message
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

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
    

@app.route('/api/chat_history', methods=["GET"])
def chat_history():
    chat_id = request.args.get("chat_id")
    messages = Message.query.filter_by(session=chat_id).all()
    data = [msg.to_dict() for msg in messages]
    return jsonify(data)

@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    question_from_frontend = request.json["question"]
    chat_id = request.args.get("chat_id")

    conversation_history = Message.query.filter_by(session=chat_id).all()

    response = generate_answer_from_chat_model(question_from_frontend, conversation_history)
    print(response)

    chat_user = Message(sender="user", content=question_from_frontend, session=chat_id)
    chat_bot = Message(sender="assistant", content=response, session=chat_id)

    db.session.add(chat_user)
    db.session.add(chat_bot)
    db.session.commit()

    return jsonify(chat_bot.to_dict())


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)