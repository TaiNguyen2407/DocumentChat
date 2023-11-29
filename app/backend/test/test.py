import pytest
from backend.app import app
from backend.logic.utils import generate_answer_from_chat_model



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
        {"content": "Hello!"},
        {"content": "How can I help you today?"}
    ]

    question = "What is the capital of Finland?"

    response = generate_answer_from_chat_model(question, conversation_history)

    assert isinstance(response, str)
    assert len(response) > 0


def test_handle_frontend_request_route(client):
    response = client.post('/api/chat/user-question', json={"question": "What is the capital of Finland?"})
    
    assert response.status_code == 200

    assert response.json["sender"] == "assistant"
    assert "content" in response.json

    assert len(response.json) == 2
