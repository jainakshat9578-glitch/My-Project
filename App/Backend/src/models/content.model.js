import mongoose from "mongoose"

const contentSchema=new mongoose.Schema({
    title:String,
    url:String,
    content:String,
    tags:[String],
    embedding:[Number],

    type:{
        type:String,
        enum:["url","text","image","video"],
        default:"text"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
},{timestamps:true})


export default mongoose.model("Content",contentSchema)