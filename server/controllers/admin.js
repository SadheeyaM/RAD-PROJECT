import TryCatch from "../middleware/trycatch.js";
import { Courses } from "../models/Courses.js";

export const createCourse = TryCatch(async(req, res)=>{

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