from typing import List
from langchain.text_splitter import  RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import LlamaCppEmbeddings
from gpt4all import GPT4All

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

def save_index_to_local_folder(index: FAISS, local_folder_path: str):
    return index.save_local(folder_path=local_folder_path)

def load_index_from_local(index: FAISS, embeddings: LlamaCppEmbeddings, local_folder_path: str):
    return index.load_local(folder_path=local_folder_path, embeddings=embeddings)
    

def generate_answer_from_chat_model(model: GPT4All, question: str, conversation_history: list, temp: int = 0):
    context = " ".join([msg["content"] for msg in conversation_history])

    with model.chat_session():
        return model.generate(prompt=f"{context}\nUser: {question}", temp=temp)