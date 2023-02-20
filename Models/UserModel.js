const mongoose=require("mongoose")

const userModelSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
     gender:{type:String},
      password:{type:String},
       city:{type:String},
       age:{type:Number},
})


const UserModel=mongoose.model("user",userModelSchema)

module.exports={UserModel}