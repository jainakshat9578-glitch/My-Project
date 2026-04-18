import express from "express"
import { semanticSearch } from "../controllers/search.controller.js";

const router=express.Router()

router.get("/",semanticSearch)

export default router;