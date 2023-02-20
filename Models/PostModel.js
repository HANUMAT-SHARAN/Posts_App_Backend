const mongoose=require("mongoose")

const postModelSchema=mongoose.Schema({
    title:{type:String},
    body:{type:String},
     device:{type:String},
     userId:{type:String},
     
       no_if_comments:{type:Number},
})


const PostModel=mongoose.model("post",postModelSchema)

module.exports={PostModel}