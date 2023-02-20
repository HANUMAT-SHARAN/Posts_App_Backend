const express = require("express");
const bcrypt = require("bcrypt");
const jswt=require("jsonwebtoken")
const { UserModel } = require("../Models/UserModel");
const UserRouter = express.Router();

UserRouter.post("/users/register", async (req, res) => {
  const { email, password, name, age, gender, city } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      res.send({ msg: `User already exist, please login` });
    } else {
      bcrypt.hash(password, 5, async (error, hash) => {
        if (error) res.send({ msg: `Something Went wrong` });
        let newUser = new UserModel({
          name,
          email,
          city,
          age,
          gender,
          password: hash,
        });
        await newUser.save();
        res.send({ msg: "User Registerd Succesfully" });
      });
    }
  } catch (error) {
    res.send({ msg: `Something Went wrong` });
  }
});

UserRouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user=await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,async(error,result)=>{
            if(error)res.send({ msg: `Something Went wrong` })
            else{
               if(result==true){
                 const token=   jswt.sign({user:user[0]},"hanumat")
                res.send({msg:`User logined SUCCESS`,token:token})
               }
            }
        })
    }else{
        res.send({ msg: `User Not Exists Please Creat New Account` })
    }
  } catch (error) {
    res.send({ msg: `Something Went wrong` })
  }
});

module.exports = { UserRouter };
