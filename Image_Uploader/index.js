const {connection} = require('./config/db')
require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require('cors')
const fs = require('fs')

app.use(express.json())
app.use(cors({
    origin: "*"
}))


const Image = mongoose.model(
    'image',
    mongoose.Schema({
      imageUrl: String
    })
  );

app.get("/", async(req, res) => {
    res.send("Welcome to Home...")
})

app.post('/upload', async (req, res) => {
    try {
      const newImage = new Image({
        imageUrl: req.body.imageUrl
      });
      await newImage.save();
      res.json(newImage.imageUrl);
    } catch (err) {
      console.error('Something went wrong', err);
    }
  });

  app.get('/getLatest', async (req, res) => {
    const getImage = await Image.findOne().sort({ _id: -1 });
    res.json(getImage.imageUrl);
  });

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