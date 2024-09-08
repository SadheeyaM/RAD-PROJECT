import express from 'express';
import {
  getReview,
  deleteReview,
  updateReview,
  createReview,
} from "../controllers/review.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();


router.post("/new/:id", isAuth, createReview);
router.delete("/deleteReview/:id",isAuth, deleteReview);
router.put("/updateReview/:id", isAuth, updateReview);
router.get("/getReview/:id", isAuth, getReview);
  
export default router;