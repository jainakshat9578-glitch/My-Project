import Content from "../models/content.model.js"
import { generateEmbeddding } from "../services/embedding.service.js"
import { cosineSimilarity } from "../services/similarity.service.js"

export const semanticSearch=async (req,res)=>{
  try{
    const {query}=req.body;
    if(!query){
        return res.status(400).json({
            message:"Query is required"
        })
    }

    const queryEmbedding=await generateEmbeddding(query)

    const contents=await Content.find({user: req.user._id})

    const results=contents.map(item=>{
        const score = cosineSimilarity(queryEmbedding,item.embedding)

        return {
            ...item.toObject(),
            score
        }
    })

    results.sort((a,b)=>b.score-a.score)
    const topResults=results.slice(0,10)
    res.status(200).json({
       results: topResults
    })
  }catch(err){
    console.error(err)

    res.status(500).json({
        message:"Search Failed",
        error:err.message
    })
  }
}