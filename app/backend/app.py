from flask import Flask, jsonify
import dotenv, requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    response = {
        'message' : 'hello world from backend'
    }
    return jsonify(response)

@app.route('/test')
def test():
    return 'testing from a different route'

if __name__ == "__main__":
    app.run(debug=True)


