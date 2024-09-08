import express from 'express';
const router = express.Router();
import { Feedback } from '../models/Review.js';
import TryCatch from "../middlewares/TryCatch.js"; 
import { User } from "../models/User.js";
import { Courses } from "../models/Courses.js";

export const getAllReviews = TryCatch(async (req, res) => {
  const reviews = await Feedback.find();
  res.json({
    reviews,
  });
});

export const getReview = async (req, res) => {
    try {
        const { id: courseId } = req.params; 
        const userId = req.user._id; 

        const review = await Feedback.findOne({ userId, courseId });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Could not fetch review." });
    }
};

export const deleteReview = TryCatch(async (req, res) => {
  const review = await Feedback.findById(req.params.id);
  
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  await review.deleteOne();
  res.json({ message: "Review Deleted" });
});

export const updateReview = TryCatch(async (req, res) => {
    const { feedback } = req.body; 
    const review = await Feedback.findById(req.params.id);
  
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
  
    review.feedback = feedback; 
  
    await review.save(); 
  
    res.status(200).json({ message: "Review updated successfully", review });
  });

export const createReview = TryCatch(async (req, res) => {
    const { msg } = req.body;
    
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);
  
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
  
    const newFeedback = await Feedback.create({
      userId: req.user._id,
      courseId: course._id,
      feedback: msg,
    });
  
    res.status(201).json({
      message: 'Review successfully submitted',
      feedback: newFeedback
    });
  });
  
