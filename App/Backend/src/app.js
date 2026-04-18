import express from "express"
import cors from "cors"
import contentRoutes from "./routes/content.routes.js"
import searchRoutes from "./routes/search.routes.js"
import relatedRoutes from "./routes/related.routes.js"
import resurfaceRoutes from "./routes/resurface.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"


const app=express()

app.use(cors({
    origin: "https://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/content", contentRoutes)
app.use("/api/search",searchRoutes)
app.use("/api/related",relatedRoutes)
app.use("/api/resurface",resurfaceRoutes)
app.use("/api/auth",authRoutes)





app.get("/",(req,res)=>{
    res.send("API is running")
});


export default app
