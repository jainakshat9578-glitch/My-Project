import express from "express"
import { getResurfacedContent } from "../controllers/resurface.controller.js"


const router=express.Router()

router.get("/", getResurfacedContent)

export default router