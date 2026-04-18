import "dotenv/config";
import { CohereEmbeddings } from "@langchain/cohere";

const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY,
  model: "embed-multilingual-v3.0", // 🔥 best model
});

export const generateEmbeddding = async (text) => {
  try {
    const result = await embeddings.embedQuery(text);

    console.log("✅ EMBEDDING:", result);

    return result; // array of numbers
  } catch (err) {
    console.error("❌ Embedding Error:", err.message || err);
    return [];
  }
};




