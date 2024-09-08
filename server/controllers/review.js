import express from 'express';
const router = express.Router();
import { Feedback } from '../models/Review.js';
import TryCatch from "../middlewares/TryCatch.js"; // Assuming you have this middleware
import { User } from "../models/User.js";
import { Courses } from "../models/Courses.js";

// Get all reviews
export const getAllReviews = TryCatch(async (req, res) => {
  const reviews = await Feedback.find();
  res.json({
    reviews,
  });
});

export const getReview = async (req, res) => {
    try {
        const { id: courseId } = req.params; // Extract courseId from URL parameters
        const userId = req.user._id; // Get userId from authenticated user

        // Find the review based on userId and courseId
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

// Delete a review by ID
export const deleteReview = TryCatch(async (req, res) => {
  const review = await Feedback.findById(req.params.id); // Corrected to Feedback
  
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  await review.deleteOne();
  res.json({ message: "Review Deleted" });
});

// Update review by ID
export const updateReview = TryCatch(async (req, res) => {
    const { feedback } = req.body; // Update this line to expect 'feedback' instead of 'msg'
    const review = await Feedback.findById(req.params.id);
  
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
  
    review.feedback = feedback; // Update this line to update the 'feedback' field
  
    await review.save(); // Save the updated review
  
    res.status(200).json({ message: "Review updated successfully", review });
  });

// Create feedback for a course
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
      feedback: msg, // Corrected typo
    });
  
    res.status(201).json({
      message: 'Review successfully submitted',
      feedback: newFeedback
    });
  });
  
