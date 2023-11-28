from typing import List
import os
from langchain.text_splitter import  RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import LlamaCppEmbeddings
from gpt4all import GPT4All


def replace_folder_if_exists(folder_path):
    if os.path.exists(folder_path):
        # If the folder already exists, remove it
        for root, dirs, files in os.walk(folder_path, topdown=False):
            for file in files:
                os.remove(os.path.join(root, file))
            for dir in dirs:
                os.rmdir(os.path.join(root, dir))
        os.rmdir(folder_path)

    # Create a new folder
    os.makedirs(folder_path)

def is_file_size_valid(file_path, max_size: int):
    return os.path.getsize(file_path) <= max_size

def generate_answer_from_chat_model(model: GPT4All, question: str, conversation_history: list, temp: int = 0):
    context = " ".join([msg["content"] for msg in conversation_history])

    with model.chat_session():
        return model.generate(prompt=f"{context}\nUser: {question}", temp=temp)


def split_chunks(sources: List[str]):
    chunks = []
    splitter = RecursiveCharacterTextSplitter(chunk_size=256, chunk_overlap=32)
    for chunk in splitter.split_documents(sources):
        chunks.append(chunk)
    return chunks

def create_index(chunks: List[str], embeddings: LlamaCppEmbeddings):
    texts = [doc.page_content for doc in chunks]
    metadatas = [doc.metadata for doc in chunks]

    search_index = FAISS.from_texts(texts, embeddings, metadatas=metadatas)

    return search_index


def similarity_search(query: str, index: FAISS):
    matched_docs = index.similarity_search(query, k=4)
    sources = []
    for doc in matched_docs:
        sources.append(
            {
                "page_content": doc.page_content,
                "metadata": doc.metadata,
            }
        )

    return matched_docs, sources
