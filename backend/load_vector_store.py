import faiss
import json
from sentence_transformers import SentenceTransformer
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VECTOR_INDEX_PATH = os.path.join(BASE_DIR, "data", "vector_store.index")
CHUNKS_PATH = os.path.join(BASE_DIR, "data", "chunks.json")

print(f"Loading FAISS index from {VECTOR_INDEX_PATH}...")
index = faiss.read_index(VECTOR_INDEX_PATH)

print(f"Loading chunks from {CHUNKS_PATH}...")
with open(CHUNKS_PATH, "r") as f:
    chunks = json.load(f)

# Load same embedding model used in Kaggle
embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def search(query, top_k=3):
    print("Encoding query...")
    q = embedder.encode([query], convert_to_numpy=True)

    distances, indices = index.search(q, top_k)

    results = []
    for i in indices[0]:
        if i < len(chunks):
            results.append(chunks[i])
    return results
