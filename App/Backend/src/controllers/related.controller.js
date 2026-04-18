import Content from "../models/content.model.js"
import { cosineSimilarity } from "../services/similarity.service.js"


export const getRelatedItems=async (req,res)=>{
    try{
        const {id}=req.params

        const currentItem=await Content.findById(id)
        if(!currentItem){
            return res.status(404).json({
                message:"content not found"
            })
        }

        const contents= await Content.find();

        const results=contents.map(item=>{
            const score=cosineSimilarity(
                currentItem.embedding,
                item.embedding
            )
            return {
                ...item.toObject(), //item is a Mongoose document (not plain JS object)
                score               //.toObject() converts it into normal JS object
            }
        })

        const filtered=results.filter(item=>item._id.toString()!==id)

        filtered.sort((a,b)=>b.score-a.score)   // Sorting items by highest similarity first

        const related=filtered.slice(0,5)       // give top 5 related items

        res.status(200).json({
            related
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"Failed to fetch related items",
            error:err.message
        })
    }
}