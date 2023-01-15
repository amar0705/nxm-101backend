const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {noteRouter} = require("./routes/note.route")
const {authenticate} = require("./middlewares/authenticate.middleware")

const app = express ()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to the Homepage")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)


app.listen(8080, async()=>{
    try{
        await connection
        console.log("Connected to the Database")
    }catch(err){
        console.log("Trouble connecting to the Database")
        console.log(err)
    }
    console.log("Listening to port 8080")
})

