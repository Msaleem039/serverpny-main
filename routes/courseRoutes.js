import express from 'express';
import { 
  createCourse, 
//   deleteCourse, 
//   getCourseById, 
//   getCourses, 
//   getCoursesByCategory, 
//   updateCourse, 
  getCoursesByCategorySlug, 
  getCourseBySlug, 
  getallCourses,
  getCoursesByName,

} from '../controllers/courseController.js';
const courseRoutes = express.Router();
courseRoutes.post('/', createCourse);
courseRoutes.get("/", getallCourses)
// courseRoutes.get('/', getCourses);
// courseRoutes.get('/:id', getCourseById);
// courseRoutes.get('/:courseSlug', getCourseBySlug);

// courseRoutes.delete('/:id', deleteCourse);
// courseRoutes.put('/:id', updateCourse);
// courseRoutes.get('/category/:categoryId', getCoursesByCategory);

// courseRoutes.get('/category/slug/:categorySlug', getCoursesByCategorySlug);
courseRoutes.get('/:categorySlug', getCoursesByCategorySlug);
courseRoutes.get('/:categoryId',getCoursesByName);
export default courseRoutes;

// https://www.pnytrainings.com/courses/marketing
// https://www.pnytrainings.com/courses/marketing/:?



// import express from 'express';
// import { createCourse, deleteCourse, getCourseById, getCourses, getCoursesByCategory, updateCourse } from '../controllers/courseController.js';


// const courseRoutes = express.courseRoutes();
// courseRoutes.post('/',createCourse);
// courseRoutes.get('/',getCourses);
// courseRoutes.get('/:id',getCourseById);
// courseRoutes.delete('/:id',deleteCourse);
// courseRoutes.put('/:id',updateCourse);
// courseRoutes.get("/category/:categoryId", getCoursesByCategory);
// export default courseRoutes;
