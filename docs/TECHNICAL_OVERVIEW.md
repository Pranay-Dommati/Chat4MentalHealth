# Chat4MentalHealth — Technical Overview (Current Version)

This document captures the current, working implementation of the Chat4MentalHealth project, including architecture, decisions, improvements, setup, and troubleshooting. It reflects the code in this repository as of the latest changes.

## TL;DR
- Local-first mental health assistant powered by Retrieval-Augmented Generation (RAG).
- Backend: Flask + FAISS + Sentence-Transformers + Ollama LLMs (default: `mistral`).
- Frontend: React + Vite, single Chat experience, responsive UI.
- Data: FAISS index (`vector_store.index`) + chunk store (`chunks.json`).
- Fallbacks: If LLM isn’t reachable or times out, a context-based safe response is returned.

---

## Stack Overview
- Backend: Python 3.x, Flask, FAISS, `sentence-transformers/all-MiniLM-L6-v2`, Requests
- LLM Runtime: Ollama (local), models used: `mistral`, `tinyllama`, optional `qwen2.5:1.5b-instruct`
- Frontend: React 18, Vite, TailwindCSS
- Storage: Local files under `backend/data/`

---

## Repository Layout (Relevant)
```
backend/
  mental_health_bot.py        # Flask app & routes
  load_vector_store.py        # RAG pipeline: FAISS + Ollama integration
  requirements.txt            # Python dependencies
  data/
    vector_store.index        # FAISS binary index
    chunks.json               # Source chunks (retrieval corpus)
frontend/
  src/
    components/chat/
      ChatPage.jsx
      components/ChatInterface.jsx  # Main chat UI
  vite.config.js
  package.json
```

---

## Backend Architecture
### Data & Retrieval
- Embeddings model: `sentence-transformers/all-MiniLM-L6-v2` (384-dim) loaded via Sentence-Transformers.
- Index: FAISS `vector_store.index` (binary) created offline and loaded at app start.
- Corpus: `chunks.json` aligns with FAISS IDs. On query, top-k indices map to chunk text.

### RAG Flow
1. Receive user text in `/chat`.
2. Embed query; FAISS similarity search (default top_k=1–3 in `search_faiss`).
3. Build a concise prompt with the highest-ranked chunk as context (trimmed for token safety).
4. Call Ollama with `model = "mistral"` (current default) to generate a short, empathetic reply.
5. If Ollama fails or times out, fall back to a safe, context-based response.

### LLM Integration
- API: `http://localhost:11434/api/generate`
- Default model: `mistral` (change in `backend/load_vector_store.py` → `OLLAMA_MODEL`).
- Timeout: 120s to handle first-load warmup for larger models.

### Key File: `backend/load_vector_store.py`
- Loads FAISS index and `chunks.json`.
- `search_faiss(query, top_k=3)` — returns top raw chunks.
- `call_ollama(prompt, model)` — wraps Ollama HTTP call with safety/timeout.
- `ask_rag(question, top_k=1)` — RAG orchestration, prompt assembly, fallback behavior.
- `search(query, top_k=1)` — main entry used by Flask endpoint.

Current prompt template in use:
```
<|system|>
You are a caring mental health assistant. Give short, warm responses (1-2 sentences only).
</s>
<|user|>
Context: {context}

{question}
</s>
<|assistant|>
```
Note: This works with lightweight chat-style models. Mistral also handles plain prompts well; if desired, you can swap to a more instruction-like template.

### REST Endpoints (`backend/mental_health_bot.py`)
- `GET /health`
  - Returns: `{ "status": "ok" }` when the server is healthy.
- `POST /chat`
  - Body: `{ "message": "text" }`
  - Returns: `{ "responses": ["...model reply..."] }`
- `POST /sentiment` (optional/experimental)
  - Body: `{ "message": "text" }`
  - Returns: sentiment classification (implementation may vary).

### Error Handling & Fallbacks
- Ollama not running → logs instructions to start `ollama serve`.
- Timeouts → increased to 120s for first-call warmup; subsequent calls are faster due to model cache.
- Model response quality issues → prompt cleaning and context-based fallback to ensure user always gets a helpful message.

---

## Frontend Architecture
- Single-route chat application for clarity and focus.
- Components: `ChatPage.jsx` → `ChatInterface.jsx` (headers, messages, quick topics, input bar).
- UI improvements:
  - Centered, max-width container (`3xl/4xl`), responsive padding.
  - Backdrop-blur header, subtle gradients, shadows, and hover states.
  - Message bubbles with improved contrast and spacing.
  - Accessible input with disabled states and clear connectivity feedback.

Run locally:
```bash
cd frontend
npm install
npm run dev
```

---

## Local Development — End-to-End
### 1) Python environment
```bash
cd backend
pip install -r requirements.txt
```

### 2) Start Ollama server (keep this terminal open)
```bash
ollama serve
```
Verify:
```bash
curl http://localhost:11434
# → Ollama is running
```

### 3) Pull/select your model
```bash
ollama pull mistral
# optional
ollama pull tinyllama
ollama pull qwen2.5:1.5b-instruct
```

Change default model (optional): edit `backend/load_vector_store.py` → `OLLAMA_MODEL = "mistral"` (or `tinyllama`, `qwen2.5:1.5b-instruct`).

### 4) Start the backend
```bash
cd backend
python mental_health_bot.py
```

### 5) Start the frontend
```bash
cd frontend
npm run dev
```

---

## Improvements Implemented (Chronological Highlights)
- Fixed FAISS format mismatch (pickle vs binary). Switched to `faiss.read_index` and aligned `chunks.json` mapping.
- Built a clean RAG pipeline: FAISS retrieval → context truncation → prompt → Ollama generation.
- Added Ollama integration with switchable models (TinyLlama, Mistral, Qwen small).
- Increased request timeout to handle first-load warmup for larger models.
- Implemented graceful fallbacks: context-based safe response if LLM is unavailable.
- Simplified frontend to a single Chat route; removed unused pages.
- Polished UI: centered layout, responsive padding, improved bubbles, header, and CTA styling.
- Logging made explicit and human-readable for easier debugging (retrieval, model calls, fallbacks).

---

## Performance Notes
- FAISS retrieval is in-memory and fast. Typical top-k retrieval completes in milliseconds once the index is loaded.
- LLM cold start (first request after model load) may take several seconds; subsequent responses are faster due to in-memory cache.
- TinyLlama → faster, lower quality; Mistral → higher quality, slightly heavier. Qwen 1.5B-Instruct is a good middle ground.

---

## Verification & Quick Tests
Health check:
```bash
curl http://127.0.0.1:5000/health
```

Manual LLM test:
```bash
ollama run mistral "Hello"
```

Chat endpoint (example):
```bash
curl -X POST http://127.0.0.1:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"I have been feeling anxious lately"}'
```

---

## Troubleshooting
- Port 11434 already in use
  - Another Ollama server is running. Keep it open or stop the existing one before starting a new instance.
- `Ollama not running` or timeouts
  - Start with `ollama serve`; verify with `curl http://localhost:11434`.
  - First call after pulling or switching models may be slow (model warmup).
- Retrieval returns unrelated content
  - Ensure the FAISS index matches the `chunks.json`. Rebuild if the corpus changed.
- Flask running but frontend shows "Connecting..."
  - Confirm backend logs show `/health` returning 200.
  - Check CORS and network tab for any blocked requests.

---

## Security & Privacy
- Local-first: No external API calls for inference.
- Data never leaves the machine; suitable for privacy-sensitive use cases.
- Avoid logging PII; logs focus on system state (retrieval, model availability, timing).

---

## Next Steps / Backlog
- Add streaming responses for better perceived latency.
- Add evaluation harness for response quality (hallucination checks, empathy tone scoring).
- Build an indexer script to (re)generate `vector_store.index` and `chunks.json` from raw sources.
- Add environment variable support for model selection and timeouts.
- Optional: containerize with Docker for consistent deployment.

---

## Appendix
### Current Backend Constants
- `backend/load_vector_store.py`
  - `OLLAMA_URL = "http://localhost:11434/api/generate"`
  - `OLLAMA_MODEL = "mistral"`

### Example Fallback Text (when LLM unavailable)
```
"I hear you, and I want you to know that your feelings are valid. Consider reaching out to a mental health professional who can provide personalized support."
```

### Example Prompt Snippet (in code)
```
<|system|>
You are a caring mental health assistant. Give short, warm responses (1-2 sentences only).
</s>
<|user|>
Context: {context}

{question}
</s>
<|assistant|>
```

— End of document —
