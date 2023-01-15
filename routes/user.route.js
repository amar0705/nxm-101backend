const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    const {email,pass,name,age} = req.body
    try{
       bcrypt.hash(pass, 5, async(err, secure_password) => {
        if(err){
            console.log(err)
        }else{
            const user = new UserModel({email,pass:secure_password,name,age})
            await user.save()
            res.send("Registered")
            }
       })  
    }catch(err){
        res.send("Error in registering the user")
        console.log(err)
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass} = req.body
    try{
        const user = await UserModel.find({email})
        const hashed_pass = user[0].pass
        if(user.length>0){
            bcrypt.compare(pass, hashed_pass, (err, result)=>{
                if(result){
                    const token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"message":"Login Sucessful", "token":token})
                } else {
                    res.send("Wrong Credentials")
                }
            });  
        }else{
            res.send("Wrong Credentials")
        }
    }catch(err){
        res.send("Something went wrong")
        console.log(err)
    }
})

module.exports = {userRouter}