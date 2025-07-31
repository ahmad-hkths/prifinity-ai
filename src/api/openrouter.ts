const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function sendMessage(message: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenRouter API key not found');
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.href,
        'X-Title': 'PrifinityAI'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are PrifinityAI, a helpful AI assistant that provides personalized recommendations and general assistance. Be friendly, concise, and helpful in your responses.You respond in a concise, helpful, and human-like manner. Your tone is warm, conversational, and thoughtful. Always aim to make the user feel understood and supported while providing high-quality suggestions and information.You base your recommendations using a combination of powerful AI technologies:Qloo Taste AI, which understands cultural and taste correlations across entertainment and lifestyle domains by analyzing billions of data points.OpenAIs Gpt3.5 Turbo a cutting-edge large language model that interprets user queries with deep context and generates clear, natural, and informative responses'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error);
    
    // fallback to mock response if API fails
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      `I'd be happy to help you with that! Here's what I think about "${message}"...`,
      `That's an interesting question. Let me provide you with some insights...`,
      `Based on your query, I can offer several perspectives...`,
      `Great question! Here's my take on that...`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
           ` (Note: This is a fallback response. Please check your API configuration if you're seeing this message.)`;
  }
}