// n8n Webhook Configuration
// Set REACT_APP_N8N_WEBHOOK_URL in .env.local

// Mock responses for demo/testing (when no webhook configured)
const mockResponses: Record<string, string> = {
  'योजना': 'हमारे पास PM-KISAN, कிसान क्रेडिट कार्ड, और फसल बीमा योजनाएं हैं। अधिक जानकारी के लिए "योजनाओं" पेज पर जाएं।',
  'बीमा': 'फसल बीमा आपकी फसल को प्राकृतिक आपदाओं से बचाता है। PMFBY, मौसम आधारित बीमा उपलब्ध हैं।',
  'मूल्य': 'न्यूनतम समर्थन मूल्य (MSP) सरकार द्वारा तय किया जाता है। वर्तमान MSP दरें हमारे कंज्यूमर डैशबोर्ड में देखें।',
  'default': 'नमस्ते! मैं आपकी कृषि संबंधी समस्याओं में मदद कर सकता हूँ। कृपया अपना सवाल हिंदी या अंग्रेजी में पूछें।',
};

export const WEBHOOK_CONFIG = {
  // n8n webhook URL for Gemini AI calls
  n8nWebhookUrl: process.env.REACT_APP_N8N_WEBHOOK_URL || '',
  
  // Optional: API keys if needed for authentication
  apiKey: process.env.REACT_APP_N8N_API_KEY || '',
  
  // Timeout for webhook calls (ms)
  timeout: 30000,
  
  // Use mock responses when no webhook is configured (for testing)
  useMockMode: !process.env.REACT_APP_N8N_WEBHOOK_URL,
};

// Helper function to get mock response
const getMockResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  
  // Check for keywords in Hindi
  if (lowerMsg.includes('योजना') || lowerMsg.includes('scheme')) return mockResponses['योजना'];
  if (lowerMsg.includes('बीमा') || lowerMsg.includes('insurance')) return mockResponses['बीमा'];
  if (lowerMsg.includes('मूल्य') || lowerMsg.includes('price') || lowerMsg.includes('msp')) return mockResponses['मूल्य'];
  
  return mockResponses['default'];
};

// Helper function to send message to n8n webhook or use mock
export const sendMessageToWebhook = async (message: string): Promise<string> => {
  // Use mock mode if no webhook configured
  if (WEBHOOK_CONFIG.useMockMode) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockResponse(message);
  }

  try {
    const response = await fetch(WEBHOOK_CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(WEBHOOK_CONFIG.apiKey && { 'Authorization': `Bearer ${WEBHOOK_CONFIG.apiKey}` }),
      },
      body: JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
        source: 'kisan-seva-portal',
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply || data.message || 'No response from AI';
  } catch (error) {
    console.error('Webhook call failed:', error);
    // Fallback to mock response
    return getMockResponse(message);
  }
};
