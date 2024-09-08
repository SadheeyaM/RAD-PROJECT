import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";
import {CourseRequest} from "../models/requests.js"

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image: image?.path,
    duration,
    price,
  });

  res.status(201).json({
    message: "Course Created Successfully",
  });
});

export const addLectures = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "No Course with this id",
    });

  const { title, description } = req.body;

  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });

  res.status(201).json({
    message: "Lecture Added",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video deleted");
  });

  await lecture.deleteOne();

  res.json({ message: "Lecture Deleted" });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("video deleted");
    })
  );

  rm(course.image, () => {
    console.log("image deleted");
  });

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted",
  });
});

export const updateCourse = TryCatch(async (req, res) => {
  console.log("Updating course...");

  const { id } = req.params;
  const { title, description, category, createdBy, duration, price } = req.body;
  const image = req.file;

  console.log(req.body);
  console.log(req.file);

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
  if (image) course.image = image.path;

  await course.save();

  res.status(200).json({
      message: "Course updated successfully"
  });
});

export const updateLecture = TryCatch(async (req, res) => {
  console.log("Updating lecture...");
  const { id } = req.params; 
  const { title, description } = req.body;
  const file = req.file; 


  console.log(req.body);
  console.log(req.file);
  
  const lecture = await Lecture.findById(id);

  if (!lecture) {
      return res.status(404).json({
          message: "No Lecture With This Lecture ID",
      });
  }

  if (title) lecture.title = title;
  if (description) lecture.description = description;
  if (file) lecture.video = file.path; 

  await lecture.save();

  res.status(200).json({
      message: "Lecture Video Has Been Updated",
      lecture
  });
});


export const getAllStats = TryCatch(async (req, res) => {
  const totalCourses = await Courses.countDocuments();  
  const totalLectures = await Lecture.countDocuments();  
  const totalUsers = await User.countDocuments();
  const totalCourseRequests = await CourseRequest.countDocuments(); 

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
    totalCourseRequests,
  };

  res.json({
    message: "Statistics retrieved successfully",
    stats,
  });
});

export const getAllRequests = TryCatch(async (req, res) => {
  const requests = await CourseRequest.find();

  res.json({
    message: "All course requests retrieved successfully",
    requests,
  });
});

export const getAllUser = TryCatch(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  res.json({ users });
});

export const updateRole = TryCatch(async (req, res) => {
  if (req.user.mainrole !== "superadmin")
    return res.status(403).json({
      message: "This endpoint is assign to superadmin",
    });
  const user = await User.findById(req.params.id);

  if (user.role === "user") {
    user.role = "admin";
    await user.save();

    return res.status(200).json({
      message: "Role updated to admin",
    });
  }

  if (user.role === "admin") {
    user.role = "user";
    await user.save();

    return res.status(200).json({
      message: "Role updated",
    });
  }
});

export const approveCourseRequest = TryCatch(async (req, res) => {
  const { id } = req.params;

  const courseRequest = await CourseRequest.findById(id);

  if (!courseRequest) {
    return res.status(404).json({ message: "Course request not found" });
  }

  courseRequest.status = "approved";
  await courseRequest.save();

  res.status(200).json({
    message: "Course request approved successfully",
    courseRequest,
  });
});

