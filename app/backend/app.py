from flask import Flask, jsonify, request
import dotenv, requests
from flask_cors import CORS
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

chat_model = "orca-mini-3b-gguf2-q4_0.gguf"
model = GPT4All(model_name=chat_model)

@app.route('/')
def chat():
    print("hello world")


def generate_answer_from_chat_model(question: str, temp: int = 0):
    with model.chat_session():
        return model.generate(prompt=question, temp=temp)
    

@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    question_from_frontend = request.json["question"]
    response = generate_answer_from_chat_model(question_from_frontend)
    print(response)
    data_to_send_back = {"sender" : "assistant", "content" : response}
    return jsonify(data_to_send_back)


if __name__ == "__main__":
    app.run(debug=True)


