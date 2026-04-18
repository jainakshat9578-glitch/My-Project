import express from "express"
import { SaveContent,getAllContent,getContentById,deleteContent, getGraph } from "../controllers/content.controller.js"
import { semanticSearch } from "../controllers/search.controller.js"
import { upload } from "../middleware/upload.js"
import { authMiddleware } from "../middleware/auth.middleware.js"


const router= express.Router()

router.post("/",authMiddleware,upload.single("file"),SaveContent)
router.get("/",authMiddleware,getAllContent)
router.get("/graph",authMiddleware,getGraph)
router.get("/:id",authMiddleware,getContentById)
router.delete("/:id",authMiddleware,deleteContent)
router.post("/semantic-search",authMiddleware,semanticSearch)



export default router