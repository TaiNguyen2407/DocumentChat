from flask import Flask, jsonify, request
import dotenv, requests
from flask_cors import CORS
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

data = []

chat_model = "orca-mini-3b-gguf2-q4_0.gguf"
model = GPT4All(model_name=chat_model)

@app.route('/')
def chat():
    return "hello world"

    
def generate_answer_from_chat_model(question: str, conversation_history: list, temp: int = 0):
    context = " ".join([msg["content"] for msg in conversation_history])

    with model.chat_session():
        return model.generate(prompt=f"{context}\nUser: {question}", temp=temp)
    

@app.route('/api/chat/all-messages', methods=["GET"])
def chat_history():
    return data
    

@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    question_from_frontend = request.json["question"]
    response = generate_answer_from_chat_model(question_from_frontend, data)
    print(response)
    data_to_send_back = {"sender" : "assistant", "content" : response}
    chat_user = {"sender" : "user", "content" : question_from_frontend}
    chat_bot = data_to_send_back
    data.append(chat_user)
    data.append(chat_bot)
    return jsonify(data_to_send_back)


if __name__ == "__main__":
    app.run(debug=True)


