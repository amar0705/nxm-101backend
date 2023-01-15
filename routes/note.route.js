const { response } = require("express")
const {NoteModel} = require("../models/note.model")
const express = require("express")

const noteRouter = express.Router()

noteRouter.get("/", async(req,res)=>{
    try{
        const notes = await NoteModel.find()
        res.send(notes)
    }
    catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
})

noteRouter.post("/create", async(req,res)=>{
    const payload = req.body
    try{
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send("Created the note")
    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})

noteRouter.patch("/update/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userID_in_making = req.body.userID
    try{
        if(userID_in_making!==userID_in_note){
            res.send({"message":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }
    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})

noteRouter.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id
    try{
        await NoteModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the note")
    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})

module.exports = {noteRouter}