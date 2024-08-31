import TryCatch from "../middleware/trycatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import {rm} from "fs" ;
import {promisify} from "util"
import fs from "fs" ;
import {User} from "../models/user.js"

export const createCourse = TryCatch(async(req, res)=>{
    console.log("Sadheeya in course")

    const {title, description, category, createdBy, duration, price} = req.body

    const image = req.file

    console.log(req.body) ;
    console.log(req.file) ;

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price,
    })

    res.status(201).json({
        message: "Course Created Successfully"
    })
})

export const addLecture = TryCatch(async(req,res)=> {
    const course = await Courses.findById(req.params.id)

    if(!course) return res.status(404).json({
        message: "No Course With This Course ID",
    }) ;

    const {title,description} = req.body ;

    const file = req.file ;

    const lecture = await Lecture.create({
        title ,
        description ,
        video: file?.path,
        course: course._id
    })

    res.status(201).json({
        message: "Lecture Video Was Been Added" ,
        lecture
    })

})

export const deleteLecture = TryCatch (async(req,res) => {
    const lecture = await Lecture.findById(req.params.id) ;

    // rm(lecture.video,() => {
    //     console.log("The Lecture Video Has Been Deleted") ;
    // }) ;

    await lecture.deleteOne() ;

    res.json({message: "The Lecture Video Had Been Deleted"}) ;
})
 
const unlinkAsync = promisify(fs.unlink) ;

export const deleteCourse = TryCatch(async(req,res) => {
    const course = await Courses.findById(req.params.id) ;

    const lectures = await Lecture.find({course: course._id})

    // await Promise.all(
    //     lectures.map(async(lectures)=> {
    //         await unlinkAsync(lecture.video) ;
    //         console.log("The Video Has Been Deleted")
    //     }) 
    // ) ;
    // rm(course.image,() => {
    //     console.log("The Course Has Been Deleted") ;
    // }) ;

    await Lecture.find({course: req.params.id}).deleteMany()

    await course.deleteOne() ;
    console.log("Course has been deleted")


    await User.updateMany({} , {$pull: {subscription: req.params.id}}) ;
    console.log("videos Have been deleted")

    res.json({
        message: "The Course Has Been Deleted" 
    })
}) ;