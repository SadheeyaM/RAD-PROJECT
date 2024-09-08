import mongoose from "mongoose";

const schema = new mongoose.Schema({
    rating: {
        type: Number ,
        required: true 
    } ,
    comment: {
        type: String ,
        required: false
    } ,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses" ,
        required: true ,
    } ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})