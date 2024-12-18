// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
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
// Load environment variables
dotenv.config();
// Connect to the database
connectDB();
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: "10mb" }));
// CORS Middleware Configuration
const allowedOrigins = ['http://localhost:5173', 'https://backend-pny.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable sending cookies and credentials
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allow these methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
}));
// API routes
app.use('/api/categories',categoryRoutes);
app.use('/api/instructors',instructorRoutes);
app.use('/api/courses',courseRoutes);
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
// Start the server


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
