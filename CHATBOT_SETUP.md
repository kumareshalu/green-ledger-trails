# 🤖 AI ChatBot with n8n & Gemini Integration - Setup Guide

## Overview
The ChatBot is now integrated into your Kisan Seva Portal (bottom-right corner). It communicates with your n8n webhook, which calls Gemini API for responses.

---

## ⚙️ Setup Steps

### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Sign in with your Google account
3. Click **"Create API Key"** → **"Create API key in new project"**
4. Copy the API key

### Step 2: Set up n8n Workflow

#### Option A: Use n8n Cloud
1. Go to [n8n.io](https://n8n.io) and sign up
2. Create a new workflow
3. Add nodes as below

#### Option B: Self-hosted n8n
```bash
docker run -it --rm -p 5678:5678 n8nio/n8n
```
Visit `http://localhost:5678`

#### n8n Workflow Setup:
1. **Webhook Trigger Node**
   - Set method: `POST`
   - Copy the webhook URL (you'll need this)

2. **HTTP Request Node** (to call Gemini API)
   - Method: `POST`
   - URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - Authentication: None
   - Headers:
     ```
     Content-Type: application/json
     ```
   - Body:
     ```json
     {
       "contents": [{
         "parts": [{
           "text": "=== {{ $json.message }} ===" 
         }]
       }],
       "generationConfig": {
         "temperature": 0.7,
         "maxOutputTokens": 200
       }
     }
     ```
   - Add query parameter: `key` = Your Gemini API Key

3. **Function Node** (to extract response)
   ```javascript
   return {
     reply: $json.candidates[0].content.parts[0].text
   };
   ```

4. **Response Node**
   - Respond with: `{ "reply": "{{ $json.reply }}" }`

### Step 3: Add Webhook URL to Environment

Create `.env.local` in project root:
```bash
REACT_APP_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
REACT_APP_N8N_API_KEY=optional-if-needed
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

---

## 🧪 Testing

### Test the Webhook
```bash
curl -X POST https://your-n8n-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"message":"नमस्ते, मुझे सरकारी योजनाओं के बारे में बताओ"}'
```

### Test in App
1. Click the **"AI सहायक"** button (bottom-right)
2. Type a question in Hindi or English
3. Chat should appear and respond

---

## 📋 ChatBot Features
✅ Collapsible/Expandable UI (9:16 aspect ratio)  
✅ Message history with timestamps  
✅ Loading indicator  
✅ Hindi + English support  
✅ Error handling with fallback messages  
✅ Floating button (bottom-right corner)  

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| ChatBot not appearing | Check browser console for errors; verify ChatBot component mounted in `App.tsx` |
| Webhook timeouts | Increase `timeout` in `/src/config/webhook.ts` |
| Gemini API errors | Verify API key is valid and has quota remaining |
| CORS errors | Enable CORS on n8n webhook settings |
| Responses not showing | Check n8n workflow Response node returns `{ "reply": "..." }` |

---

## 📝 n8n Workflow JSON (Quick Import)
You can import this JSON directly into n8n:

[Create workflow in UI or import JSON template]

---

## 🚀 Next Steps
- Add typing indicators
- Implement message persistence (localStorage or DB)
- Add suggested quick-reply buttons
- Multi-language support expansion
- Analytics integration

---

**Happy farming! 🌾**
