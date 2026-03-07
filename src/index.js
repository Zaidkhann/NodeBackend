import dotenv from "dotenv"
import connectDb from "./db/index.js";
import { app } from "./app.js";


dotenv.config({path:'./env'})


const PortNo = process.env.PORT || 3000

connectDb()
.then(()=>{
    const server = app.listen(PortNo,()=>{
        console.log("Server is running at port: ",PortNo)
    })
    server.on("error",(err)=>{
        console.log("Server Failed !!!  ",err)
    })
})
.catch((err)=>{
    console.log("MongoDB connection ERror!!!: "+ err);
    
})





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