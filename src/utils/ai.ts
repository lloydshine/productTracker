import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeComment(comment: string) {
  try {
    const ANALYSIS_PROMPT = `You are a sentiment analyzer assistant that will respond only in JSON (without additional characters or backticks). Your task is to analyze the sentiment of the provided comment and classify it as 'positive', 'neutral', or 'negative'. 

    Sample JSON OUTPUT:
    {
      "sentiment": "positive",
      "rating": 9,
      "feedback": {
        "positive": ["Excellent product!", "Highly recommend it."],
        "negative": []
      }
    }

    The Comment:
    "${comment}"

    The JSON (without additional characters or backticks):`;

    const result = await model.generateContent(ANALYSIS_PROMPT);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
}
