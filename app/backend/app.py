from flask import Flask, jsonify, request
import dotenv, requests
from flask_cors import CORS
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

chat_model = "orca-mini-3b-gguf2-q4_0.gguf"
model = GPT4All(chat_model)

@app.route('/')
def chat():
    print("hello world")

@app.route('/api/chat/user-question', methods=["POST"])
def handle_frontend_request():
    print(request.json)
    
    # Do something here with received data from frontend
    # ... 
    # ...

    response_data = {'message': 'Data received successfully'}
    return jsonify(response_data)

@app.route('/api/chat/bot-answer', methods=["GET"])
def send_data_to_frontend():
    ## after send prompts from user to the AI model
    # data_to_send = answer generated from chat model
    example_data_to_send = {'role': 'assistant', 'content': ' Hello! How may I assist you today?'}
    return jsonify(example_data_to_send)

if __name__ == "__main__":
    app.run(debug=True)


