import express from 'express'
import { isAdmin, isAuth } from '../middleware/isAuth.js'
import { addLecture, createCourse, deleteCourse, deleteLecture, updateCourse, updateLecture } from '../controllers/admin.js'
import { uploadFiles } from '../middleware/multer.js' 

const router = express.Router()

router.post("/course/new", isAuth , isAdmin , createCourse)
router.post("/course/:id", isAuth , isAdmin, uploadFiles, addLecture) ;
router.delete("/course/:id", isAuth , isAdmin, deleteCourse) ;
router.delete("/lecture/:id" , isAuth, isAdmin , uploadFiles, deleteLecture) ;
router.put("/course/:id", isAuth, isAdmin, uploadFiles, updateCourse);
router.put("/lecture/:id", isAuth, isAdmin, uploadFiles, updateLecture);



export default router;