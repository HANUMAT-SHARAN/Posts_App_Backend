const express=require("express")
const {connection}=require("./Configs/db.js")
const {UserRouter}=require("./Routes/UsersRoute.js")
const cors=require("cors")
const { PostRouter } = require("./Routes/PostsRoute.js")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())

app.use("/",UserRouter)
app.use("/",PostRouter)

app.get("/",(req,res)=>{
    res.send("Home Page")
})
// {"name":"Hanumat","email":"hanumat@gmail.com","password":"Hanumat","age":19,"city":"Amritsar"}

app.listen(process.env.port,async()=>{
    console.log("server Is started at 8080 ")
    try{
        await connection ;
        console.log("Data base is conected")
    }
    catch(error){
        console.log(error)
    }

})