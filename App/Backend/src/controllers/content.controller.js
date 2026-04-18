import Content from "../models/content.model.js"
import { generateEmbeddding } from "../services/embedding.service.js"
import { generateTagsandSummary } from "../services/ai.service.js"
import { cosineSimilarity } from "../services/similarity.service.js"
import { imagekit } from "../config/Imagekit.js"


export const SaveContent = async (req,res)=>{
try{

let {title,url,content,type} = req.body;

let fileUrl = url;
let detectedType = type;

if(req.file){

const base64File =
`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

const uploadRes = await imagekit.upload({
file: base64File,
fileName: req.file.originalname,
});

fileUrl = uploadRes.url;

if(!title){
title = req.file.originalname;
}

if(req.file.mimetype.startsWith("image")){
detectedType = "image"
}
else if(req.file.mimetype.startsWith("video")){
detectedType = "video"
}

}

// detect type from url
if(!req.file && fileUrl){

if(
fileUrl.includes("youtube.com") ||
fileUrl.includes("youtu.be") ||
fileUrl.includes("vimeo.com")
){
detectedType = "video"
}
else if(/\.(jpg|jpeg|png|gif|webp)/.test(fileUrl)){
detectedType = "image"
}
else if(fileUrl.startsWith("http")){
detectedType = "url"
}

}

const fullText = `${title || ""} ${fileUrl || ""} ${content || ""}`;

// 🔥 save immediately
const newContent = new Content({
title: title || "Untitled",
url: fileUrl || "",
content: content || "",
summary: "",
tags: [],
embedding: [],
type: detectedType || "text",

user: req.user._id
})

await newContent.save()

async function runAI(){
try{

const [aiData, embedding] = await Promise.all([
generateTagsandSummary(fullText),
generateEmbeddding(fullText)
]);

await Content.findByIdAndUpdate(newContent._id,{
summary: aiData?.summary || "",
tags: aiData?.tags || [],
embedding
})

}catch(err){
console.log("AI background error:",err.message)
}
}

runAI();


res.status(201).json({
message:"content saved",
newContent
})

}catch(err){
console.error("SAVE ERROR:", err)
res.status(500).json({ error: err.message })
}
}



export const getAllContent=async (req,res)=>{
    try{
        const contents=await Content.find({user: req.user._id}).sort({createdAt:-1})

        return res.status(200).json({
            contents
        })
    }catch(err){
        return res.status(500).json({
            message:"Error fetchning contents",
            error:err.message
        })
    }
}

export const getContentById=async (req,res)=>{
    try{
        const {id}=req.params

        const content=await Content.findById(id)

        if(!content){
         return res.status(404).json({
            message:"content not found"
         })
        }
        return res.status(200).json({
            content
        })
    }catch(err){
        return res.status(500).json({
            message:"Error fetching content",
            error:err.message
        })
    }
}

export const deleteContent = async (req,res)=>{
    try{
        const {id}= req.params

        const deleted = await Content.findByIdAndDelete({
            _id: req.params.id,
             user: req.user._id
        })

        if(!deleted){
            return res.status(404).json({
                message:"content not found"
            })
        }
        res.json({
            message:"content deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message:"error deleting content",
            err:err.message
        })
    }
}

export const getGraph = async (req,res)=>{
    try{
        const contents = await Content.find({user: req.user._id})

        const nodes = contents.map((item)=>({
            id: item._id.toString(),
            title: item.title,
            type:item.type,
            url: item.url
        }))

        const edges = []

        for(let i= 0;i<contents.length;i++){
            for(let j=i+1;j<contents.length;j++){

                if(!contents[i].embedding || !contents[j].embedding) continue;

                const score = cosineSimilarity(
                    contents[i].embedding,
                    contents[j].embedding
                )
                if(score>0.4){
                    edges.push({
                        source: contents[i]._id.toString(),
                        target: contents[j]._id.toString(),
                        value: score
                    })
                }
            }
        }

        res.json({
            nodes,
            edges
        })
    }catch(err){
         res.status(500).json({
            err:err.message
         })
    }
}