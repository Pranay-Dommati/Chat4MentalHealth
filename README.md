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

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact [your-email@example.com].
