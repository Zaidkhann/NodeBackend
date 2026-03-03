import dotenv from "dotenv"
import connectDb from "./db/index.js";
import express from "express"

dotenv.config({path:'./env'})




connectDb()
const app = express()




// second approach (not good for production level)
/*
( async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log(`Error: ${error}`)
            throw error
        })
        app.listen(process.env.DB_NAME,()=>{
            console.log(`app is running on ${process.env.DB_NAME}`)
        })
    }
    catch(error){
        console.log(`🥭❌ MongoDB connection Error : ${error}`)
    }
} )()*/