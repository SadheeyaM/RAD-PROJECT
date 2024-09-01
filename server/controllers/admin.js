import TryCatch from "../middleware/trycatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js" ;
import {rm} from "fs" ;
import {promisify} from "util" 
import fs from "fs" ;
import {User} from "../models/user.js"

export const createCourse = TryCatch(async(req, res)=>{
    console.log("Sadheeya in course")

    const {title , description , category , createdBy, duration, price} = req.body

    const image = req.file

    console.log(req.body) ;
    console.log(req.file) ;

    await Courses.create({
        title ,
        description ,
        category ,
        createdBy ,
        image: image?.path ,
        duration ,
        price ,
    })

    res.status(201).json({
        message: "Course Created Successfully"
    })
})

export const updateCourse = TryCatch(async (req, res) => {
    console.log("Updating course...");

    const { id } = req.params;
    const { title, description, category, createdBy, duration, price } = req.body;
    // const image = req.file;

    console.log(req.body);
    // console.log(req.file);

    const course = await Courses.findById(id);

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (createdBy) course.createdBy = createdBy;
    if (duration) course.duration = duration;
    if (price) course.price = price;
    // if (image) course.image = image.path;

    await course.save();

    res.status(200).json({
        message: "Course updated successfully"
    });
});

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

export const updateLecture = TryCatch(async (req, res) => {
    console.log("Updating lecture...");
    const { id } = req.params; 
    const { title, description } = req.body;
    // const file = req.file; 


    console.log(req.body);
    // console.log(req.file);
    
    const lecture = await Lecture.findById(id);

    if (!lecture) {
        return res.status(404).json({
            message: "No Lecture With This Lecture ID",
        });
    }

    if (title) lecture.title = title;
    if (description) lecture.description = description;
    // if (file) lecture.video = file.path; 

    await lecture.save();

    res.status(200).json({
        message: "Lecture Video Has Been Updated",
        lecture
    });
});


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