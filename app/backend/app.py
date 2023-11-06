from flask import Flask, jsonify, render_template, request
import dotenv, requests
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-fi")
model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-en-fi")
translator = pipeline(task='translation', model=model, tokenizer=tokenizer)

app = Flask(__name__, template_folder='templates')
@app.route("/")
def hello():
    return render_template("index.html")

@app.route('/send_text', methods=['POST'])
def send_text():
    try:
        data = request.get_json()
        text = data['text']
        translation = translator(text)[0]['translation_text']
        response = {'message' : f'{translation}'}
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': 'Invalid data'}), 400


#Text translation can be used with Inference API through the function below 
#Please contact me at phatn@metropolia.fi for API key and URL
#Just need to call this function with mentioned variables from .env file
#config = dotenv.dotenv_values(".env")
#API_TOKEN = config["API_TOKEN"]
#API_URL = config["API_URL"]
#headers = {"Authorization": f"Bearer {API_TOKEN}"}
#def translate_query(payload):
#	response = requests.post(API_URL, headers=headers, json=payload)
#	return response.json()


if __name__ == "__main__":
    app.run(debug=True)


