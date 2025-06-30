# 🧠 Mental Health AI Companion

A modern AI-powered mental health companion application designed to provide personalized support, sentiment analysis, and wellness recommendations. Built with Flask (Python) for the backend and React (JavaScript) for the frontend.

## 📌 Overview
This project aims to assist users in managing their mental health by providing a conversational AI interface, sentiment analysis, and actionable insights. The application leverages Retrieval-Augmented Generation (RAG) to deliver evidence-based responses tailored to user input.

## ✨ Key Features

### Frontend
- **Modern UI**: Clean, responsive design with intuitive navigation.
- **Chat Interface**:
  - Real-time messaging with AI.
  - Sentiment analysis visualization.
- **Analytics Dashboard**:
  - Emotional trend tracking.
  - Progress charts for mental wellness.
- **Community Support**:
  - Access to professional resources.
  - Meditation and wellness tools.

### Backend
- **AI Response Generation**:
  - Retrieval-Augmented Generation (RAG) for personalized replies.
  - Vector similarity matching using TF-IDF.
- **Sentiment Analysis**:
  - Keyword-based sentiment detection.
  - Confidence scoring for emotional tone.
- **API Endpoints**:
  - `/chat`: Generate AI responses.
  - `/sentiment`: Analyze sentiment.
  - `/health`: Health check for the server.

## 🔧 Tech Stack

### Frontend
- **Framework**: React
- **Styling**: CSS Modules
- **Build Tool**: Vite

### Backend
- **Framework**: Flask
- **Libraries**:
  - Flask-CORS
  - scikit-learn
  - numpy
  - pickle

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Development Setup

#### Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/mental-health-ai-companion.git
cd mental-health-ai-companion
```

#### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python mental_health_bot.py
   ```

#### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Access the Application
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

## 🏗️ System Architecture

### Component Architecture
- **Frontend**:
  - Chat Interface
  - Analytics Dashboard
  - Meditation Tools
- **Backend**:
  - AI Response Generation
  - Sentiment Analysis

### API Endpoints
| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| POST   | `/chat`        | Generate AI response            |
| POST   | `/sentiment`   | Analyze sentiment               |
| GET    | `/health`      | Health check for the server     |

## 📈 Roadmap

### Planned Features
- Real-time collaborative chat
- Advanced sentiment analysis
- Integration with professional mental health services
- Gamified wellness tracking

### Performance Goals
- Optimized response time (< 200ms)
- Scalable architecture for high user traffic

## 👥 Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push to branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author
Built by Sai Charan

GitHub: [charan22640](https://github.com/charan22640)

## 🙏 Acknowledgments
- Flask Team
- React Team
- scikit-learn
- All our contributors
