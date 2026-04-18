import express from "express"
import { getRelatedItems } from "../controllers/related.controller.js"

const router = express.Router()

router.get("/:id",getRelatedItems)

export default router