import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    video: {
        type: String,
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectsId ,
        ref: "Courses",
        required: true
    },

    createdAt: {
        type: Date ,
        default: Date.now()
    }
})

export const Lecture = mongoose.model("Lecture",schema) ;