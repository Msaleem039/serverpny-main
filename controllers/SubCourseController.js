import SubCourse from "../models/SubCourse.js";
import { uploadFiles } from "../multer/multerConfig.js";
import mongoose from "mongoose";

// ✅ Create a new SubCourse
export const createSubCourse = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      // Get file paths if files were uploaded
      const Imagesub = req.files["Imagesub"] ? req.files["Imagesub"][0].path : null;
      const Brochuresub = req.files["Brochuresub"] ? req.files["Brochuresub"][0].path : null;
      // Prepare course data
      const courseData = {
        ...req.body,
        Imagesub: Imagesub,
        Brochuresub: Brochuresub,
        Instructor: req.body.Instructor ? new mongoose.Types.ObjectId(req.body.Instructor) : null, // Convert Instructor ID to ObjectId
        category: req.body.category ? new mongoose.Types.ObjectId(req.body.category) : null, // Convert Category ID to ObjectId
      };

      // Create the course
      const course = new SubCourse(courseData);
      await course.save();

      // Add the course to the category's courses array
      if (course.category) {
        await Category.findByIdAndUpdate(course.category, {
          $push: { courses: course._id },
        });
      }

      res.status(201).json({ message: "SubCourse created successfully", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error: " + error.message });
    }
  });
};

// ✅ Get all SubCourses
export const getAllSubCourses = async (req, res) => {
  try {
    const subCourses = await SubCourse.find()
      .populate("Instructor") // Populate instructor details
      .populate("category"); // Populate category details
    res.status(200).json(subCourses);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Get a single SubCourse by ID
export const getSubCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCourse = await SubCourse.findById(id)
      .populate("Instructor") // Populate instructor details
      .populate("category"); // Populate category details

    if (!subCourse) {
      return res.status(404).json({ message: "SubCourse not found" });
    }

    res.status(200).json(subCourse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Update a SubCourse
export const updateSubCourse = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { id } = req.params;
      const updateData = req.body;

      // Handle file updates
      if (req.files?.Imagesub) {
        updateData.Imagesub = req.files.Imagesub[0].path;
      }
      if (req.files?.Brochuresub) {
        updateData.Brochuresub = req.files.Brochuresub[0].path;
      }

      // Convert Instructor and Category IDs to ObjectId if provided
      if (updateData.Instructor) {
        updateData.Instructor = new mongoose.Types.ObjectId(updateData.Instructor);
      }
      if (updateData.category) {
        updateData.category = new mongoose.Types.ObjectId(updateData.category);
      }

      // Update the course
      const updatedSubCourse = await SubCourse.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedSubCourse) {
        return res.status(404).json({ message: "SubCourse not found" });
      }

      // Update the category's courses array if the category was changed
      if (updateData.category && updatedSubCourse.category !== updateData.category) {
        // Remove the course from the old category
        await Category.findByIdAndUpdate(updatedSubCourse.category, {
          $pull: { courses: updatedSubCourse._id },
        });

        // Add the course to the new category
        await Category.findByIdAndUpdate(updateData.category, {
          $push: { courses: updatedSubCourse._id },
        });
      }

      res.status(200).json({ message: "SubCourse updated successfully", subCourse: updatedSubCourse });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
};

// ✅ Delete a SubCourse
export const deleteSubCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the course
    const deletedSubCourse = await SubCourse.findByIdAndDelete(id);
    if (!deletedSubCourse) {
      return res.status(404).json({ message: "SubCourse not found" });
    }

    // Remove the course from the category's courses array
    if (deletedSubCourse.category) {
      await Category.findByIdAndUpdate(deletedSubCourse.category, {
        $pull: { courses: deletedSubCourse._id },
      });
    }

    res.status(200).json({ message: "SubCourse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};