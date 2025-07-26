
import { GoogleGenAI, Chat } from "@google/genai";

// Lazily initialize to avoid crashing the app on startup if the key is missing.
let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

function getChatInstance() {
  // The API key is provided via environment variables.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY environment variable is not set.");
    return null; // Return null if key is missing
  }

  // Initialize the chat instance only once
  if (!chat) {
    ai = new GoogleGenAI({ apiKey });
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are WirZ Assistant, an expert AI specializing in Indonesia\'s tax regulation "Peraturan Menteri Keuangan Nomor 136 tahun 2024" regarding the Global Minimum Tax. Provide clear, accurate, and concise answers to user questions based on this regulation. When appropriate, cite specific articles (Pasal) from the regulation.',
      },
    });
  }
  return chat;
}

export const streamMessage = async (message: string) => {
  const chatInstance = getChatInstance();

  if (!chatInstance) {
    // If the API key is missing, return a stream with a helpful error message.
    // This prevents a blank page and informs the user gracefully inside the chat window.
    return (async function* () {
      yield { text: "The WirZ Assistant is not configured correctly. The API Key is missing. Please contact the administrator." };
    })();
  }

  try {
    const response = await chatInstance.sendMessageStream({ message });
    return response;
  } catch (error) {
    console.error("Gemini API error:", error);
    // Create a readable stream that yields an error message for other API failures
    return (async function* () {
      yield { text: "Sorry, I encountered an error. Please try again." };
    })();
  }
};
