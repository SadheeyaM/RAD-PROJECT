import express from 'express' 
import dotenv from "dotenv"
import { connect } from 'mongoose';
import { connectDB } from './database/db.js';
import cors from 'cors'


dotenv.config() ;

const app = express() ;

app.use(express.json()) ;
app.use(cors())

const port = process.env.PORT ;

app.get('/',(req,res)=>{
    res.send("Server Is Now Working.") ;
})

import userRoutes from './routes/user.js'
import courseRoutes from "./routes/course.js";
import adminRoutes from './routes/admin.js'


app.use("/api", userRoutes)
app.use("/api", courseRoutes)
app.use("/api", adminRoutes)


app.listen(port, ()=> {
    console.log(`Server Is Running On http://localhost:${port}`) ;
    connectDB() ;
}) ;