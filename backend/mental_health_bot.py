from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

def setup_perplexity_client():
    api_key = "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"
    client = OpenAI(
        base_url="https://api.perplexity.ai",
        api_key=api_key,
    )
    return client

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        
        client = setup_perplexity_client()
        response = client.chat.completions.create(
            model="sonar",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a compassionate mental health support AI assistant. "
                        "Provide empathetic, supportive, and concise responses while maintaining "
                        "appropriate boundaries. Focus on mental health support and well-being. "
                        "Engage in a friendly and interactive manner, like a caring companion. "
                        "If you detect signs of crisis, recommend professional help and provide emergency resources."
                    )
                },
                {
                    "role": "user",
                    "content": message
                }
            ]
        )
        
        return jsonify({
            'response': response.choices[0].message.content,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(port=5000)