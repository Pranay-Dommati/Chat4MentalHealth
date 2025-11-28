from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import sys
import os

# Add current directory to path to ensure imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the search function from our new FAISS loader
from load_vector_store import search

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message', '').strip()
        
        if not message:
            return jsonify({
                'response': "I'm here to listen. Please share what's on your mind.",
                'source': 'system',
                'status': 'success'
            })
        
        print(f"\n{'='*60}")
        print(f"[Chat Request] User message: '{message[:80]}...'")
        
        # Get AI response using FAISS vector search
        results = search(message, top_k=1)
        
        if results:
            response = results[0]
            source = 'vector_store'
            print(f"[Response Source] 📂 FROM: backend/data/vector_store.index (FAISS)")
        else:
            response = "I'm sorry, I couldn't find a relevant response in my database."
            source = 'no_match'
            print(f"[Response Source] ❌ No match found in vector store")
        
        print(f"[Response] '{response[:80]}...'")
        print(f"{'='*60}\n")
        
        return jsonify({
            'response': response,
            'source': source,
            'status': 'success'
        })
    
    except Exception as e:
        print(f"\n[ERROR] Chat endpoint failed:")
        traceback.print_exc()
        print(f"{'='*60}\n")
        return jsonify({
            'error': str(e),
            'traceback': traceback.format_exc(),
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
