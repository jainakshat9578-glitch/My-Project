import Content from "../models/content.model.js"

export const getResurfacedContent=async (req,res)=>{
    try{

        
    // Get date 7 days ago
        const sevenDaysAgo=new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7)

        const oldItems=await Content.find({
            createdAt:{$lte : sevenDaysAgo}
        }).sort({createdAt:-1})

        const resurfaced=oldItems.slice(0,5)
        res.status(200).json({
            resurfaced
        })
    }catch(err){
        console.error(err)

        res.status(500).json({
            message:"Failed to fetch resurfaced content",
            error:err.message
        })
    }
}