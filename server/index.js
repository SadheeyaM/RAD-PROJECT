import express from 'express' 
import dotenv from "dotenv"
import { connect } from 'mongoose';
import { connectDB } from './database/db.js';

dotenv.config() ;

const app = express() ;

app.use(express.json()) ;

const port = process.env.PORT ;

app.get('/',(req,res)=>{
    res.send("Server Is Now Working.") ;
})

import userRoutes from "./routes/user.js"

app.use('/api' , userRoutes) ;

app.listen(port, ()=> {
    console.log(`Server Is Running On http://localhost:${port}`) ;
    connectDB() ;
}) ;