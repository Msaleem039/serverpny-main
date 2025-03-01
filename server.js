// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import cors from 'cors';
import blogpostrouter from './routes/blogpostroutes.js';
import blogcatroutes from './routes/Blogcatroutes.js';
import specialBroutes from './routes/special.blogPostRoutes.js';
import specialcityroutes from './routes/cityCategoryRoutes.js';
import router from './routes/eflyerRoutes.js';
import routerfaq from './routes/faqCategoryRoutes.js';
import routerquestion from './routes/questionRoutes.js';
import routergallery from './routes/galleryCategoryRoutes.js';
import freetrailrouter from './routes/freetrialroutes.js';
import eventrouter from './routes/eventCategoryRoutes.js';
import Everouter from './routes/eventRoutes.js';
import modelroutes from './routes/coursemodel.js';
import subCategoryroutes from './routes/subCategoryroutes.js';
import routersubcourse from './routes/subCources.js';
import courseRoutes from './routes/courseRoutes.js';

// Load environment variables
dotenv.config();
// Connect to the database
connectDB();
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: "50mb" }));
// CORS Middleware Configuration
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:10001', // Add more ports or domains as needed
    'https://backend-pny.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from allowed origins or requests without origin (Postman, server-side)
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable sending cookies and credentials
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed request headers
}));
// API routes
app.use('/',categoryRoutes);
// app.use('/api',categoryRoutes);
app.use('/api/instructors',instructorRoutes);
app.use('/api/course',courseRoutes);
app.use('/api/blogpost',blogpostrouter);
app.use('/api/blogcate',blogcatroutes);
app.use('/api/specialcatblog',specialBroutes);
app.use('/api/citycategory',specialcityroutes);
app.use('/api/eflyer',router);
app.use('/api/faqcat',routerfaq);
app.use('/api/faquestion',routerquestion);
app.use('/api/gallery',routergallery);
app.use('/api/freetrial',freetrailrouter);
app.use('/api/event',eventrouter);
app.use('/api/eventpost',Everouter);
app.use('/api/coursemodel',modelroutes);
app.use('/api/subCategory',subCategoryroutes);
app.use('/api/subCourse',routersubcourse);
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
