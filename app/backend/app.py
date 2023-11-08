from flask import Flask, jsonify
import dotenv, requests
from flask_cors import CORS
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    response = {
        'message' : 'hello world from backend'
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)


