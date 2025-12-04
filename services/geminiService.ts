import { VerificationResult } from "../types";

// ============================================
// DEEPAUTH API CONFIGURATION
// ============================================
// Your teammate should update this URL to point to his DeepAuth backend
const DEEPAUTH_API_URL = "https://your-deepauth-api.com/verify";  // ← CHANGE THIS

// If his API requires an API key, add it here
const DEEPAUTH_API_KEY = process.env.DEEPAUTH_API_KEY || "";  // ← Add to .env.local

export const verifyUrl = async (url: string): Promise<VerificationResult> => {
  try {
    // ============================================
    // OPTION 1: REST API (most common)
    // ============================================
    const response = await fetch(DEEPAUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Uncomment if API requires authentication:
        // "Authorization": `Bearer ${DEEPAUTH_API_KEY}`,
        // "X-API-Key": DEEPAUTH_API_KEY,
      },
      body: JSON.stringify({ 
        url: url,
        // Add any other fields DeepAuth API expects:
        // headline: url,
        // content: url,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepAuth API error: ${response.status}`);
    }

    const data = await response.json();

    // ============================================
    // MAP DEEPAUTH RESPONSE TO OUR FORMAT
    // ============================================
    // Adjust these field names to match what DeepAuth returns
    return {
      score: data.score ?? data.credibility_score ?? data.confidence ?? 50,
      verdict: data.verdict ?? data.result ?? data.classification ?? "Unverified",
      summary: data.summary ?? data.explanation ?? data.analysis ?? "Analysis complete.",
    };

  } catch (error) {
    console.error("DeepAuth API error:", error);
    throw error;
  }
};

export const streamCompletion = async (
  prompt: string,
  onChunk: (text: string) => void
): Promise<string> => {
    // Keep existing function for fallback
    return "";
};