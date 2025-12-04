# DeepAuth Integration Guide

## Overview
This guide explains how to integrate the DeepAuth backend API with the Imolé frontend.

---

## 🔧 File to Modify

**Location:** `services/geminiService.ts`

This is the only file you need to change to connect DeepAuth.

---

## 📝 Step-by-Step Integration

### Step 1: Update the API URL (Line 7)

Change this line to point to your DeepAuth API:

```typescript
const DEEPAUTH_API_URL = "https://your-deepauth-api.com/verify";
```

Replace `https://your-deepauth-api.com/verify` with your actual DeepAuth API endpoint.

---

### Step 2: Configure Authentication (If Required)

If your API requires an API key, update the `.env.local` file:

```
DEEPAUTH_API_KEY=your_api_key_here
```

Then uncomment line 22 or 23 in `geminiService.ts`:

```typescript
headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${DEEPAUTH_API_KEY}`,  // Uncomment this
  // OR
  "X-API-Key": DEEPAUTH_API_KEY,  // Or uncomment this
},
```

---

### Step 3: Adjust Request Body (Lines 24-28)

Update the request body to match what DeepAuth expects:

```typescript
body: JSON.stringify({ 
  url: url,
  // Add any other fields your API expects:
  // headline: url,
  // content: url,
  // type: "article",
}),
```

---

### Step 4: Map Response Fields (Lines 42-46)

The frontend expects this format:
```typescript
{
  score: number,      // 0-100 credibility score
  verdict: string,    // "True" | "Fake" | "Satire" | "Unverified"
  summary: string     // Explanation text
}
```

Update the mapping to match your API's response fields:

```typescript
return {
  score: data.your_score_field ?? 50,
  verdict: data.your_verdict_field ?? "Unverified",
  summary: data.your_summary_field ?? "Analysis complete.",
};
```

**Example mappings:**
- If DeepAuth returns `credibility_score` → use `data.credibility_score`
- If DeepAuth returns `result` instead of `verdict` → use `data.result`
- If DeepAuth returns `analysis` instead of `summary` → use `data.analysis`

---

## 📤 Expected API Request Format

```http
POST /verify
Content-Type: application/json

{
  "url": "https://example.com/news-article"
}
```

---

## 📥 Expected API Response Format

```json
{
  "score": 85,
  "verdict": "True",
  "summary": "This article has been verified against multiple credible sources and appears to be factually accurate."
}
```

**Supported verdict values:**
- `"True"` - Article is verified as accurate
- `"Fake"` - Article contains misinformation
- `"Satire"` - Article is satirical/parody content
- `"Unverified"` - Unable to verify the content

---

## 🧪 Testing the Integration

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Paste a URL in the input field
4. Click "Verify"
5. Check browser console (F12) for any errors

---

## 🐛 Troubleshooting

### CORS Errors
If you see CORS errors, your backend needs to allow requests from the frontend:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### API Not Responding
- Check if the API URL is correct
- Verify the API is running and accessible
- Check network tab in browser dev tools for response details

### Wrong Data Format
- Console.log the response: `console.log(data)` before the return statement
- Adjust the field mapping based on actual response structure

---

## 📁 Project Structure

```
lumina-workspace/
├── services/
│   └── geminiService.ts    ← MODIFY THIS FILE
├── components/
│   ├── HeroSection.tsx     ← Contains the verify form
│   └── ResultModal.tsx     ← Displays the results
├── .env.local              ← Add API keys here
└── DEEPAUTH_INTEGRATION_GUIDE.md  ← This file
```

---

## 🚀 After Integration

Once DeepAuth is integrated:

1. Test thoroughly with various URLs
2. Update the `.env.local` with production API keys
3. Deploy to production (Vercel, Netlify, etc.)

---

## 📧 Waitlist Emails

The "Install Extension" button collects emails to localStorage.

**To export collected emails:**
1. Open browser console (F12)
2. Type: `exportWaitlistToCSV()`
3. A CSV file will download with all emails

**To view emails in console:**
```javascript
viewWaitlistEmails()
```

---

## Questions?

Contact the team if you need help with the integration!
