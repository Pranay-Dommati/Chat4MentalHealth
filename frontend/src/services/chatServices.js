export async function sendMessage(message) {
  try {
    const response = await fetch('http://localhost:5000/chat', {
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