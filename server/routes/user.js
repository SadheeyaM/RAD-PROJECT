import express from "express";
import {
  deleteCourseRequest,
  forgotPassword,
  getMyRequests,
  loginUser,
  myProfile,
  register,
  requestCourse,
  resetPassword,
  updateCourseRequest,
  verifyUser,
} from "../controllers/user.js";

import { isAuth } from "../middlewares/isAuth.js";
import { addProgress, getYourProgress } from "../controllers/course.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
router.post("/user/forgot", forgotPassword);
router.post("/user/reset", resetPassword);
router.post("/user/progress", isAuth, addProgress);
router.get("/user/progress", isAuth, getYourProgress);
router.post('/user/requestCourse', isAuth, requestCourse);
router.get('/my-requests', isAuth, getMyRequests);
router.put("/user/requestCourse/:id", isAuth, updateCourseRequest);
router.delete("/user/deleteCourseRequest/:id", isAuth, deleteCourseRequest);

export default router;
