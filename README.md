# DocumentChat

Document Chat is a project developed under Metropolia University of Applied Sciences's scope. It is an application where user can login to keep chat history, chat, upload a document to interact with (e.g Q&A), and logout.

## Contributors:
1. Tai Nguyen
2. Anish Maharjan
3. Darja Polevaja
4. Ainara Larrañaga Flores

## Table of content:

- [Features](#features)
- [Technologies](#technologies)
- [Installation steps](#installation-steps)
- [Disclaimers](#disclaimers)
- [Feature Video](#full-feature-reviewed-video-click-to-play)

## Features:
1. **Login, Logout**: Users can login and logout using their metropolia credentials.
2. **Chat, Upload Document, Q&A**: Users can ask basic questions, upload a pdf document and ask questions regarding to the uploaded document (e.g. What is this document about?).
3. **Chat history**: Users are able to retrieve their chat history.

## Technologies:

**Frontend**:
- TypeScript
- React
- Tailwind CSS
- Vite

**Backend**:
- Python

**LLM**:
- GPT4All chat model: Mini Orca 3b
- Embedding model: Llama.cpp, llama2 7b

## Installation steps:

### Add missing llama model to your local machine
- Download this file: https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/blob/main/llama-2-7b-chat.ggmlv3.q2_K.bin

### Run application locally
- Clone the project
- Open 2 terminals
- Navigate 1 terminal to backend folder:
    * Create `docs` folder
    * Create `models` folder
    * Place newly downloaded file to `models` folder in backend
    * `pip install -r requirements.txt`
    * `python app.py`
- Navigate 1 terminal to frontend folder:
    * `npm install`
    * `npm start`

### Note
The loading time of the chat model may vary based on your local machine. Kindly be patient, particularly in the DocumentChat section. After uploading a document, allow the model sufficient time to complete the processing.
## Disclaimers

- The application is intended for educational use only and is not intended for commercial purposes.
- Occasionally, responses from the chatbot may include hallucinations; if this occurs, please refresh the application.
- The loading time of the Llama model may vary depending on the local machine; your patience is appreciated.
- All models utilized in this application are provided free of charge.
- We cannot be held responsible if the chatbot generates incorrect answers.

## Full-feature-reviewed Video (click to play)

[![Watch the video](https://img.youtube.com/vi/qK2dtLfH8MM/0.jpg)](https://youtu.be/qK2dtLfH8MM)
