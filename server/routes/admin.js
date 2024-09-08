import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  addLectures,
  approveCourseRequest,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllRequests,
  getAllStats,
  getAllUser,
  updateCourse,
  updateLecture,
  updateRole,
} from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
router.put("/course/:id", isAuth, isAdmin, uploadFiles, updateCourse);
router.put("/lecture/:id", isAuth, isAdmin, uploadFiles, updateLecture);
router.put("/user/:id", isAuth, updateRole);
router.put("/approveRequest/:id", isAuth, isAdmin, approveCourseRequest);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.get("/stats", isAuth, isAdmin, getAllStats);
router.get("/users", isAuth, isAdmin, getAllUser);
router.get('/allrequests', isAuth, getAllRequests);

export default router;
