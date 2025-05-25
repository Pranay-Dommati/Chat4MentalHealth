const API_BASE_URL = 'http://localhost:5000';

export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    if (data.status === 'error') {
      throw new Error(data.error);
    }
    return data.response;
  } catch (error) {
    console.error('Chat Error:', error);
    throw error;
  }
}

export async function analyzeSentiment(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/sentiment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    if (data.status === 'error') {
      throw new Error(data.error);
    }
    return {
      sentiment: data.sentiment,
      confidence: data.confidence
    };
  } catch (error) {
    console.error('Sentiment Analysis Error:', error);
    return { sentiment: 'neutral', confidence: 0 };
  }
}

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('Backend Health Check Failed:', error);
    return false;
  }
}