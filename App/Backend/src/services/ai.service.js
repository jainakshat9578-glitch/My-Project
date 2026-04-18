import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const model = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.3,
});

export const generateTagsandSummary = async (text) => {
  try {
    const prompt = `
Return ONLY JSON:
{
  "summary": "short summary",
  "tags": ["tag1", "tag2", "tag3"]
}

Text:
${text}
`;

    const response = await model.invoke(prompt);

    const output = response.content;

    const clean = output.replace(/```json|```/g, "").trim();

    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}") + 1;

    return JSON.parse(clean.slice(start, end));
  } catch (err) {
    console.error("❌ Gemini LangChain Error:", err.message || err);
    return { summary: "", tags: [] };
  }
};




