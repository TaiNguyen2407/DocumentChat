from typing import List
import os
from langchain.text_splitter import  RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import LlamaCppEmbeddings
from gpt4all import GPT4All
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import LlamaCpp

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


def generate_answer_from_chat_model(model: GPT4All, question: str, conversation_history: list, temp: float = 0.7):
    system_template = "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible using the context text provided. Your answers should only answer the question once and not have any text after the answer is done. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information."

    context = " ".join([msg.content for msg in conversation_history])

    with model.chat_session(system_template):
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


def generate_answer_from_loaded_document(local_index_folder: str, embeddings: LlamaCppEmbeddings, question: str, template: str, llm: LlamaCpp):
    loaded_index = FAISS.load_local(f'./{local_index_folder}', embeddings)
    matched_docs, sources = similarity_search(question, loaded_index)
    context = "\n".join([doc.page_content for doc in matched_docs])
    prompt = PromptTemplate(template=template, input_variables=["context", "question"]).partial(context=context)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    return llm_chain.run(question)
