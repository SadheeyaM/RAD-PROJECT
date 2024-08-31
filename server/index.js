import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import corcs from 'cors';

dotenv.config();

const app = express();

//using middleware
app.use(express,json())
app.use(corcs())

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Server is working");
});

// app.use("uploads", express.static("uploads"))

// importing routes
import userRoutes from './routes/user.js'
import courseRoutes from './routes/course.js'
import adminRoutes from './routes/admin.js'

//using routes
app.use("/api", userRoutes)
app.use("/api", courseRoutes)
app.use("/api", adminRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB()
});