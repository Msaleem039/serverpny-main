// routes/subCourseRoutes.js
import express from 'express';
import { createSubCourse, deleteSubCourse, getAllSubCourses, getSubCourseById, updateSubCourse } from '../controllers/SubCourseController.js';


const routersubcourse = express.Router();

// Route to get all subcourses
routersubcourse.get('/', getAllSubCourses);

// Route to get a subcourse by ID
routersubcourse.get('/:id', getSubCourseById);

// Route to create a new subcourse
routersubcourse.post('/', createSubCourse);

// Route to update an existing subcourse
routersubcourse.put('/:id', updateSubCourse);

// Route to delete a subcourse
routersubcourse.delete('/:id', deleteSubCourse);

export default routersubcourse;
