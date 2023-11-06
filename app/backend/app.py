from flask import Flask, jsonify, render_template, request
import dotenv, requests

app = Flask(__name__)

@app.route("/", defaults={"path" : "index.html"})
def hello():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(debug=True)


