import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// We assume process.env.API_KEY is available as per guidelines
const getAiClient = () => {
    if (!process.env.API_KEY) {
        console.warn("API Key not found. AI features will be disabled.");
        return null;
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getTutoringHint = async (
  equation: string,
  userIncorrectAnswer: string,
  correctAnswer: number
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Mission Control offline. Re-check your calculations manually.";

  try {
    const prompt = `
      You are a friendly 6th-grade math tutor and space mission flight computer.
      The student is trying to solve this equation: ${equation}.
      The correct answer is ${correctAnswer}.
      The student guessed: ${userIncorrectAnswer}.
      
      Without giving away the answer directly, explain in 1 or 2 short sentences why their guess might be wrong or what the correct first step is.
      Use space-themed terminology (e.g., "trajectory calculation error", "realign sensors").
      Keep it encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Calculation error detected. Check your inverse operations, Commander.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Communication link unstable. Try solving again.";
  }
};
