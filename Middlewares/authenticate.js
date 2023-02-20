
const jswt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
   
    jswt.verify(token,"hanumat",async(err,decoded)=>{
        if(decoded){
            
            req.body.userId=decoded.user._id
            console.log(req.body)
            next()
        }else{
            res.send("Someting Is not corect please login once more")
        }
    })
    
   



}
module.exports={authenticate}