import pytest
from app.backend.app import app, model
from app.backend.database.models import db, Message
from app.backend.logic.utils import generate_answer_from_chat_model

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_chat_endpoint(client):
    response = client.get('/')

    assert response.status_code == 200
    assert b'hello world' in response.data


def test_chat_history_route(client):
    response = client.get('/api/chat/all-messages')

    assert response.status_code == 200

    assert response.json == []



def test_generate_answer_from_chat_model():
    conversation_history = [
        Message(sender="user", content="Hello!", session=1),
        Message(sender="assistant", content="How can I help you today?!", session=1)
    ]

    question = "What is the capital of Finland?"

    response = generate_answer_from_chat_model(model, question, conversation_history=conversation_history)

    assert isinstance(response, str)
    assert len(response) > 0


def test_handle_frontend_request_route(client):    
    response = client.post(f'/api/chat/user-question?chat-id=1', json={"question": "What is the capital of Finland?"})
    
    assert response.status_code == 200

    assert response.json["sender"] == "assistant"
    assert "content" in response.json

    assert len(response.json) == 5