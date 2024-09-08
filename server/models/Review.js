import mongoose from "mongoose";

const schema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

export const Feedback = mongoose.model("Feedback", schema);
