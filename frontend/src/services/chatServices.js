const API_BASE_URL = 'http://localhost:5000';

export async function sendMessage(message) {
  console.log('%c[Chat Service] Sending message', 'color: #4F46E5; font-weight: bold', message);
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    console.log('%c[Chat Service] Response status:', 'color: #059669; font-weight: bold', response.status);
    const data = await response.json();
    console.log('%c[Chat Service] Full Response Data:', 'color: #8B5CF6; font-weight: bold', data);
    
    // Enhanced logging based on response source
    if (data.source) {
      console.log('\n' + '='.repeat(60));
      if (data.source === 'vector_store') {
        console.log('%c[Response Source] 📊 VECTOR STORE (vector_store.index)', 'color: #10B981; font-weight: bold; font-size: 14px');
        console.log('%c  ➜ Response generated using trained vector similarity model', 'color: #059669');
        console.log('%c  ➜ Using indexed Q&A pairs from vector_store.index', 'color: #059669');
      } else if (data.source === 'fallback_general') {
        console.log('%c[Response Source] 🔄 FALLBACK (General Response)', 'color: #F59E0B; font-weight: bold; font-size: 14px');
        console.log('%c  ➜ Low similarity score - using supportive general response', 'color: #D97706');
        console.log('%c  ➜ Not using vector_store.index', 'color: #D97706');
      } else if (data.source === 'fallback_error') {
        console.log('%c[Response Source] 🔄 FALLBACK (Error Recovery)', 'color: #EF4444; font-weight: bold; font-size: 14px');
        console.log('%c  ➜ Error occurred - using fallback response system', 'color: #DC2626');
        console.log('%c  ➜ Not using vector_store.index', 'color: #DC2626');
      } else if (data.source === 'system') {
        console.log('%c[Response Source] ⚙️ SYSTEM', 'color: #6B7280; font-weight: bold; font-size: 14px');
        console.log('%c  ➜ System message (empty input)', 'color: #4B5563');
      } else if (data.source === 'error') {
        console.log('%c[Response Source] ❌ ERROR', 'color: #DC2626; font-weight: bold; font-size: 14px');
        console.log('%c  ➜ Critical error occurred', 'color: #DC2626');
      }
      console.log('='.repeat(60) + '\n');
    }
    
    if (data.status === 'error') {
      throw new Error(data.error);
    }
    return {
      response: data.response,
      source: data.source
    };
  } catch (error) {
    console.error('%c[Chat Service] Error:', 'color: #DC2626; font-weight: bold', error);
    throw error;
  }
}

export async function analyzeSentiment(message) {
  console.log('[Sentiment Service] Analyzing sentiment for message');
  try {
    const response = await fetch(`${API_BASE_URL}/sentiment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    console.log('[Sentiment Service] Analysis result:', data);
    
    if (data.status === 'error') {
      throw new Error(data.error);
    }
    return {
      sentiment: data.sentiment,
      confidence: data.confidence
    };
  } catch (error) {
    console.error('[Sentiment Service] Error:', error);
    return { sentiment: 'neutral', confidence: 0 };
  }
}

export async function checkBackendHealth() {
  console.log('[Health Check] Checking backend health at', API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    const isHealthy = data.status === 'healthy';
    console.log('[Health Check] Backend status:', isHealthy ? '✓ Healthy' : '✗ Unhealthy');
    return isHealthy;
  } catch (error) {
    console.error('[Health Check] Failed:', error);
    return false;
  }
}