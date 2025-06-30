# 🧠 Mental Health Chatbot Platform

## 📖 Overview

This project is an AI-powered **Mental Health Chatbot Platform** designed to offer supportive conversations and emotional guidance. The system leverages a custom-trained vector store to generate context-aware responses, without using any third-party APIs like OpenAI or LangChain.

Instead, it uses a **DeepSeek R1** model trained on curated **mental health datasets** and implements a custom **Retrieval-Augmented Generation (RAG)** pipeline developed entirely on **Kaggle**. The embeddings generated from this process are stored in a serialized file (`vector_store.index`) and used for fast, relevant retrieval in real-time chatbot interactions.

---

## 🧩 Key Features

- **Conversational AI Chatbot** trained for mental wellness support  
- **RAG-based vector store** for high-quality, contextual responses  
- **No OpenAI API or LangChain used** – fully custom-built solution  
- **Frontend UI** for chatbot interaction, analytics, meditation, and community  
- **Modular codebase** with React + Vite frontend and Python backend  

---

## 🛠️ Technologies Used

### 🔹 Backend
- Python  
- Flask  
- DeepSeek R1 (for embedding generation)  
- FAISS / Custom Vector Store  
- RAG Architecture (developed in Kaggle)  
- No external AI APIs used  

### 🔹 Frontend
- React  
- Vite  
- JavaScript  
- Tailwind CSS / CSS Modules  

---

## 🧠 How It Works

### 1. Vector Store Development

- On **Kaggle**, we used the **DeepSeek R1** model to encode a collection of mental health documents (covering anxiety, depression, therapy tips, etc.).  
- These documents were transformed into **embeddings** and indexed using a vector store mechanism (like FAISS).  
- The final serialized embedding index is stored as a file:  
  **`vector_store.index`**

### 2. Retrieval-Augmented Generation (RAG)

- When a user sends a message, the chatbot:  
  1. Converts the message to an embedding  
  2. Searches the `vector_store.index` for the most similar entries  
  3. Retrieves the most relevant document chunks  
  4. Generates a response using contextual data  

- This allows the bot to give intelligent, accurate, and emotionally sensitive responses without external API calls.

---

## 🧱 Architecture Diagram

```
      ┌────────────────────────────┐
      │     React Frontend (UI)    │
      └────────────┬───────────────┘
                   │
                   ▼
     ┌──────────────────────────────┐
     │    Python Backend (API)      │
     │  - Message Handling          │
     │  - Embedding Lookup          │
     │  - Response Generation       │
     └────────────┬─────────────────┘
                  │
                  ▼
    ┌───────────────────────────────┐
    │     vector_store.index        │
    │  - DeepSeek R1 Embeddings     │
    │  - Trained on Kaggle (RAG)    │
    └───────────────────────────────┘
```

---

## 📂 Folder Structure

```
mental-health-chatbot/
│
├── backend/
│ ├── mental_health_bot.py
│ ├── requirements.txt
│ └── data/
│ └── vector_store.index
│
├── frontend/
│ ├── public/
│ ├── index.html
│ ├── package.json
│ └── src/
│ ├── components/
│ │ ├── chat/
│ │ ├── ai-assessment/
│ │ ├── meditation/
│ │ ├── analytics/
│ │ ├── community/
│ │ ├── professionals/
│ │ └── settings/
│ ├── routes/
│ └── services/
```

---

## ⚙️ Installation

### 🐍 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python mental_health_bot.py
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Improvements

- Expand dataset coverage (e.g., PTSD, ADHD, grief)  
- Build emotion detection with visual/audio input  
- Add multilingual support (Hindi, Spanish, etc.)  
- Deploy full-stack version on cloud (e.g., Vercel + Render)  
- Integrate secure user login & personalization  

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, make your changes, and open a pull request.  
For major feature proposals, feel free to open an issue first.