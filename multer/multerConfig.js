import multer from "multer";

// Set up storage configuration for multiple image types and brochures
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        switch (file.fieldname) {
            case "course_Image":
                cb(null, "uploads/images");
                break;
            case "Brochure":
            case "Brochuresub": // ✅ Added Brochuresub for subcourses
                cb(null, "uploads/brochures");
                break;
            case "postThumbnailImage":
                cb(null, "uploads/images/postThumbnail");
                break;
            case "flyerFile":
                cb(null, "uploads/images/flyers");
                break;
            case "categoryImage":
                cb(null, "uploads/images/categories");
                break;
            case "coverImage":
                cb(null, "uploads/images/covers");
                break;
            case "faqImage":
                cb(null, "uploads/images/faq");
                break;
            case "photo":
                cb(null, "uploads/images/instructorphoto");
                break;
            case "image":
                cb(null, "uploads/images/events");
                break;
            case "subimage":
            case "Imagesub": // ✅ Added Imagesub for subcourses
                cb(null, "uploads/images/subimage");
                break;
            default:
                cb(new Error("Invalid field name"), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    if (
        [
            "course_Image",
            "postThumbnailImage",
            "flyerFile",
            "categoryImage",
            "coverImage",
            "faqImage",
            "photo",
            "image",
            "subimage",
            "Imagesub", // ✅ Added Imagesub filter
        ].includes(file.fieldname)
    ) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only images are allowed."));
        }
    } else if (["Brochure", "Brochuresub"].includes(file.fieldname)) {
        // ✅ Added Brochuresub for subcourses
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only PDF is allowed for Brochures."));
        }
    } else {
        cb(new Error("Unknown file field name."));
    }
};

// Multer configuration with file size limits
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter,
});

// ✅ Updated `upload.fields()` configuration
export const uploadFiles = upload.fields([
    { name: "course_Image", maxCount: 1 },
    { name: "Brochure", maxCount: 1 },
    { name: "Brochuresub", maxCount: 1 }, // ✅ Added Brochuresub
    { name: "postThumbnailImage", maxCount: 1 },
    { name: "flyerFile", maxCount: 1 },
    { name: "categoryImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "faqImage", maxCount: 1 },
    { name: "subimage", maxCount: 1 },
    { name: "Imagesub", maxCount: 1 }, // ✅ Added Imagesub
    { name: "photo", maxCount: 1 },
    { name: "image", maxCount: 1 },
]);
