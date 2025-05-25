from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import json
import os

app = Flask(__name__)
CORS(app)

class MentalHealthVectorBot:
    def __init__(self, vector_store_path):
        self.vector_store_path = vector_store_path
        self.vectorizer = None
        self.responses = []
        self.questions = []
        self.load_vector_store()
        
    def load_vector_store(self):
        try:
            # Try to load the existing vector store
            with open(self.vector_store_path, 'rb') as f:
                data = pickle.load(f)
                
            # Handle different possible formats
            if isinstance(data, dict):
                self.vectorizer = data.get('vectorizer')
                self.responses = data.get('responses', [])
                self.questions = data.get('questions', [])
            elif isinstance(data, tuple):
                self.vectorizer, self.responses, self.questions = data
            else:
                # If it's a different format, create a fallback
                self.create_fallback_responses()
                
        except Exception as e:
            print(f"Error loading vector store: {e}")
            self.create_fallback_responses()
    
    def create_fallback_responses(self):
        """Create a basic mental health response system if vector store fails"""
        self.questions = [
            "I'm feeling anxious",
            "I'm depressed",
            "I can't sleep",
            "I'm stressed",
            "I feel overwhelmed",
            "I'm having panic attacks",
            "I feel lonely",
            "I'm having relationship problems",
            "I'm struggling with work",
            "I need motivation",
            "I feel hopeless",
            "I'm having trouble concentrating"
        ]
        
        self.responses = [
            "I understand you're feeling anxious. Try deep breathing exercises: breathe in for 4 counts, hold for 4, exhale for 4. This can help calm your nervous system.",
            "Depression can feel overwhelming, but remember that you're not alone. Consider reaching out to a mental health professional. Small steps like going for a walk or calling a friend can help.",
            "Sleep issues are common with stress. Try establishing a bedtime routine, avoiding screens before bed, and creating a calm environment.",
            "Stress is your body's natural response. Try breaking tasks into smaller steps, practice mindfulness, and make sure you're taking breaks.",
            "Feeling overwhelmed is difficult. Try listing your priorities, focus on what you can control, and don't hesitate to ask for help.",
            "Panic attacks can be scary but they're not dangerous. Focus on your breathing, ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear.",
            "Loneliness is painful but temporary. Consider joining groups with shared interests, volunteering, or reaching out to old friends.",
            "Relationships can be challenging. Communication is key - try expressing your feelings clearly and listening actively to others.",
            "Work stress is common. Set boundaries, take regular breaks, and don't forget that your worth isn't defined by your productivity.",
            "Motivation comes and goes. Start with tiny steps, celebrate small wins, and remember why your goals matter to you.",
            "Hopelessness is a symptom that can improve with support. Please consider talking to a counselor or calling a mental health helpline.",
            "Concentration issues often relate to stress or mental health. Try the Pomodoro technique, eliminate distractions, and practice mindfulness."
        ]
        
        # Create a simple vectorizer for these responses
        self.vectorizer = TfidfVectorizer(stop_words='english', lowercase=True)
        self.vectorizer.fit(self.questions)
    
    def get_best_response(self, user_message):
        try:
            # Clean and preprocess the user message
            user_message = self.preprocess_text(user_message)
            
            # Vectorize the user message
            user_vector = self.vectorizer.transform([user_message])
            
            # Vectorize all stored questions
            question_vectors = self.vectorizer.transform(self.questions)
            
            # Calculate similarity
            similarities = cosine_similarity(user_vector, question_vectors).flatten()
            
            # Get the most similar question index
            best_match_idx = np.argmax(similarities)
            similarity_score = similarities[best_match_idx]
            
            # If similarity is too low, provide a general supportive response
            if similarity_score < 0.1:
                return self.get_general_response()
            
            return self.responses[best_match_idx]
            
        except Exception as e:
            print(f"Error in get_best_response: {e}")
            return self.get_general_response()
    
    def preprocess_text(self, text):
        """Clean and preprocess text"""
        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        return text.strip()
    
    def get_general_response(self):
        """Provide a general supportive response"""
        general_responses = [
            "Thank you for sharing with me. I'm here to listen and support you. Can you tell me more about what you're experiencing?",
            "I hear you, and I want you to know that your feelings are valid. Would you like to explore what might be helpful right now?",
            "It takes courage to reach out. I'm here to help however I can. What's been on your mind lately?",
            "Your mental health matters, and so do you. Can you help me understand what you're going through?",
            "I'm glad you're taking the step to talk about how you're feeling. What would be most helpful for you right now?"
        ]
        return np.random.choice(general_responses)

# Initialize the bot
bot = MentalHealthVectorBot('data/vector_store.index')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({
                'response': "I'm here to listen. Please share what's on your mind.",
                'status': 'success'
            })
        
        # Get AI response using vector similarity
        response = bot.get_best_response(message)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({
            'response': "I'm here to support you, but I'm having some technical difficulties. Please try again or consider reaching out to a mental health professional.",
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

@app.route('/sentiment', methods=['POST'])
def analyze_sentiment():
    """Analyze sentiment of user message"""
    try:
        data = request.json
        message = data.get('message', '')
        
        # Simple sentiment analysis based on keywords
        positive_keywords = ['happy', 'good', 'great', 'better', 'improved', 'thankful', 'grateful']
        negative_keywords = ['sad', 'depressed', 'anxious', 'worried', 'stressed', 'overwhelmed', 'terrible', 'awful']
        
        message_lower = message.lower()
        positive_count = sum(1 for word in positive_keywords if word in message_lower)
        negative_count = sum(1 for word in negative_keywords if word in message_lower)
        
        if positive_count > negative_count:
            sentiment = 'positive'
        elif negative_count > positive_count:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        return jsonify({
            'sentiment': sentiment,
            'confidence': abs(positive_count - negative_count) / max(1, len(message.split())),
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(port=5000)