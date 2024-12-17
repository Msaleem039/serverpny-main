import multer from 'multer';
// Set up storage configuration for multiple image types and brochures
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        switch (file.fieldname) {
            case 'course_Image':
                cb(null, 'uploads/images'); // Save course images in 'uploads/images'
                break;
            case 'Brochure':
                cb(null, 'uploads/brochures'); // Save brochures in 'uploads/brochures'
                break;
            case 'postThumbnailImage':
                cb(null, 'uploads/images/postThumbnail'); // Save post thumbnails in 'uploads/images/postThumbnail'
                break;
            case 'flyerFile':
                cb(null, 'uploads/images/flyers'); // Save flyers in 'uploads/images/flyers'
                break;
            case 'categoryImage':
                cb(null, 'uploads/images/categories'); // Save category images in 'uploads/images/categories'
                break;
            case 'coverImage':
                cb(null, 'uploads/images/covers'); // Save cover images in 'uploads/images/covers'
                break;
                case 'faqImage':
                    cb(null, 'uploads/images/faq'); // Save cover images in 'uploads/images/covers'
                    break;
            case 'photo':
                cb(null, 'uploads/images/instructorphoto'); // Save photos in 'uploads/images/photos'
                // cb(null, 'uploads'); // Save photos in 'uploads/images/photos'
                break;
            case 'image':
                    cb(null, 'uploads/images/events'); // Save photos in 'uploads/images/photos'
                    // cb(null, 'uploads'); // Save photos in 'uploads/images/photos'
                    break;
            default:
          cb(new Error('Invalid field name'), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    if (['course_Image', 'postThumbnailImage', 'flyerFile', 'categoryImage', 'coverImage','faqImage', 'photo', 'image'].includes(file.fieldname)) {
        // Accept only image files for all defined image fields
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    } else if (file.fieldname === 'Brochure') {
        // Accept only PDF files for brochures
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF is allowed for Brochure.'));
        }
    } else {
        cb(new Error('Unknown file field name.'));
    }
};

// Multer configuration with file size limits
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Set a 10 MB limit for images; adjust for each field if needed
    },
    fileFilter,
});

// Exporting a function that allows uploading of different types of files
export const uploadFiles = upload.fields([
    { name: 'course_Image', maxCount: 1 },
    { name: 'Brochure', maxCount: 1 },
    { name: 'postThumbnailImage'},
    { name: 'flyerFile', maxCount: 1 },
    { name: 'categoryImage' },
    { name: 'coverImage', maxCount: 1 },
    { name: 'faqImage', maxCount: 1 },
    // { name: 'photo', maxCount: 1 }
    { name: 'photo' },
    { name: 'image' }
]);
