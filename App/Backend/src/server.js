import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import connectToDB from "./config/DataBase.js"


if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY is not set in .env file");
} else {
  console.log("✅ GEMINI_API_KEY loaded successfully");
}


connectToDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})