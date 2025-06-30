# Mental Health Support Platform

## Overview
This project is a Mental Health Support Platform designed to provide users with tools and resources to improve their mental well-being. It includes a chatbot for mental health assistance, analytics for tracking progress, meditation guides, community support, and professional resources.

## Features

### Backend
- **Mental Health Bot**: A Python-based chatbot that provides mental health support and guidance.
- **Vector Store**: Stores data for efficient retrieval.

### Frontend
- **AI Assessment**: Tools for assessing mental health using AI.
- **Analytics**: Progress tracking and visualization.
- **Chat Interface**: A user-friendly chat interface for interacting with the mental health bot.
- **Community Support**: A platform for users to connect and share experiences.
- **Meditation Guides**: Resources for guided meditation.
- **Professional Resources**: Access to mental health professionals.
- **Settings and Customization**: Options for personalizing the user experience.

## Technologies Used

### Backend
- Python
- Libraries specified in `requirements.txt`

### Frontend
- React
- Vite
- JavaScript
- CSS

## Installation

### Backend
1. Navigate to the `backend` directory.
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the mental health bot:
   ```bash
   python mental_health_bot.py
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install the required npm packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure
```
backend/
    mental_health_bot.py
    requirements.txt
    data/
        vector_store.index
frontend/
    src/
        components/
            ai-assessment/
            analytics/
            chat/
            common/
            community/
            dashboard/
            layout/
            meditation/
            professionals/
            settings/
            wellness/
        routes/
        services/
    public/
    index.html
    package.json
```

## Technical Details

### Architecture
The platform follows a modular architecture with a clear separation between the backend and frontend:

- **Backend**: Built using Python, the backend handles the chatbot logic, data storage, and retrieval. It uses the `vector_store.index` file for efficient data indexing and retrieval.
- **Frontend**: Developed using React and Vite, the frontend provides an interactive user interface for accessing various features like chat, analytics, and meditation guides.

### How It Works

1. **Chatbot**:
   - The chatbot is implemented in Python and uses natural language processing (NLP) techniques to understand and respond to user queries.
   - It leverages the `vector_store.index` file to retrieve relevant information quickly.

2. **Vector Store**:
   - The `vector_store.index` file is a serialized data structure that stores embeddings for efficient similarity search.
   - It is used to match user queries with the most relevant responses or resources.

3. **Retrieval-Augmented Generation (RAG)**:
   - RAG is employed to enhance the chatbot's responses by combining retrieval-based methods with generative models.
   - The system retrieves relevant context from the `vector_store.index` and uses it to generate accurate and helpful responses.

### Development Process

- **Backend**:
  - Python libraries like `langchain` and `openai` are used for NLP and chatbot development.
  - The `vector_store.index` file is created using embedding models to store and retrieve data efficiently.

- **Frontend**:
  - React components are organized into feature-specific directories for maintainability.
  - Vite is used for fast development and build processes.

### Technologies Used

- **Backend**:
  - Python
  - LangChain
  - OpenAI API
  - Vector databases

- **Frontend**:
  - React
  - Vite
  - JavaScript
  - CSS

### Future Enhancements

- Integration with more advanced AI models for better chatbot responses.
- Expansion of the `vector_store.index` to include more diverse data.
- Improved analytics and visualization tools for user progress tracking.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact [your-email@example.com].
