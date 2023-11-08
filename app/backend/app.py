from flask import Flask, jsonify
import dotenv, requests
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    response = {
        'message' : 'hello world from backend'
    }
    return jsonify(response)


from gpt4all import GPT4All
model = GPT4All("orca-mini-3b-gguf2-q4_0.gguf")
with model.chat_session():
    response1 = model.generate(prompt='hello', temp=0)
    response2 = model.generate(prompt='who is president of united states', temp=0)
    response3 = model.generate(prompt='who is the president before', temp=0)
    print(model.current_chat_session)

if __name__ == "__main__":
    app.run(debug=True)


