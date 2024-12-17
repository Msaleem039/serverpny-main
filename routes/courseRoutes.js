import express from 'express';
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from '../controllers/courseController.js';


const router = express.Router();
router.post('/',createCourse);
router.get('/',getCourses);
router.get('/:id',getCourseById);
router.delete('/:id',deleteCourse);
router.put('/:id',updateCourse);
export default router;
