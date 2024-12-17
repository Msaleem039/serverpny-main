import express from 'express';
import { createCourseOutline, deleteCourseOutline, getAllCourseOutlines, getCourseOutlineById, updateCourseOutline } from '../controllers/coursemodel.js';

const modelroutes = express.Router();

// Route to create a new course outline
modelroutes.post('/', createCourseOutline);

// Route to get all course outlines
modelroutes.get('/', getAllCourseOutlines);

// Route to get a specific course outline by ID
modelroutes.get('/:id', getCourseOutlineById);

// Route to update a course outline
modelroutes.put('/:id', updateCourseOutline);

// Route to delete a course outline
modelroutes.delete('/:id', deleteCourseOutline);

export default modelroutes;
