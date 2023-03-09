const express = require("express")
const {connection} = require("./config/db")
const cors = require("cors")
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", ( req, res ) => {
    res.send("Welcome to FB home route")
})

// app.use("./path", routers_name)

app.listen(process.env.PORT, async() => {
    try{
        await connection
        console.log("SUCCESSFULLY connected to FaceBook DataBase")
    }
    catch(error){
            console.log("Something went wrong",error);
    }
    console.log(`Server running at port ${process.env.PORT}`)
})