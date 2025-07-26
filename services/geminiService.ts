import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are WirZ Assistant, an expert AI specializing in Indonesia\'s tax regulation "Peraturan Menteri Keuangan Nomor 136 tahun 2024" regarding the Global Minimum Tax. Provide clear, accurate, and concise answers to user questions based on this regulation. When appropriate, cite specific articles (Pasal) from the regulation.',
  },
});

export const streamMessage = async (message: string) => {
  try {
    const response = await chat.sendMessageStream({ message });
    return response;
  } catch (error) {
    console.error("Gemini API error:", error);
    // Create a readable stream that yields an error message
    return (async function* () {
      yield { text: "Sorry, I encountered an error. Please try again." };
    })();
  }
};