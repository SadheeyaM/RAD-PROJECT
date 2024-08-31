import TryCatch from "../middleware/trycatch.js";
import {Courses} from "../models/Courses.js" ;
import { Lecture } from "../models/Lecture.js";
import {User} from "../models/user.js"
import { Payment } from "../models/Payment.js";

export const getAllCourses = TryCatch(async(req,res)=> {
    const courses = await Courses.find() ;
    res.json({
        courses,
    }) ;
}) ;

export const getSingleCourse = TryCatch(async(req,res) => {
    const course = await Courses.findById(req.params.id) ;
    res.json ({
        course,
    }) ;
}) ;

export const fetchLectures = TryCatch (async(req,res) => {
    const lectures = await Lecture.find({course: req.params.id}) ;

    const user = await User.findById(req.user._id) ;

    if (user.role === "admin") {
        return res.json({lectures}) ;
    }

    if (!user.subscription.includes(req.params.id)) 
        return res.status(400).json({
            message: "You Have Not Purchased This Course" 
        })
    res.json({lectures}) ;
    
})

export const fetchLecture = TryCatch(async(req,res) => {
    const lecture = await Lecture.findById(req.params.id) ;

    const user = await User.findById(req.user._id) ;

    if (user.role === "admin") {
        return res.json({lecture}) ;
    }

    if (!user.subscription.includes(req.params.id)) 
        return res.status(400).json({
            message: "You Have Not Purchased This Course" 
        })
    res.json({lecture}) ;
})

export const getMyCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find({ _id: req.user.subscription });
  
    res.json({
      courses,
    });
  });
  
  export const checkout = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);
  
    if (user.subscription.includes(course._id)) {
      return res.status(400).json({
        message: "You already have this course",
      });
    }
  
    const order = {
      id: "order_simulated_id", 
      amount: course.price * 100,
      currency: "LKR",
    };
  
    res.status(201).json({
      order,
      course,
    });
  });
  
  export const paymentVerification = TryCatch(async (req, res) => {
    const { simulated_order_id, simulated_payment_id } = req.body;
  
    if (simulated_order_id && simulated_payment_id) {
      await Payment.create({
        order_id: simulated_order_id,
        payment_id: simulated_payment_id,
      });
  
      const user = await User.findById(req.user._id);
      const course = await Courses.findById(req.params.id);
  
      user.subscription.push(course._id);
  
      await Progress.create({
        course: course._id,
        completedLectures: [],
        user: req.user._id,
      });
  
      await user.save();
  
      res.status(200).json({
        message: "Course Purchased Successfully",
      });
    } else {
      return res.status(400).json({
        message: "Payment Failed",
      });
    }
  });