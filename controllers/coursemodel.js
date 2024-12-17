import CourseOutline from "../models/courseModel.js";


// Create a new course outline
export const createCourseOutline = async (req, res) => {
  try {
    const { course, textEditor, status, courseModulePosition } = req.body;

    const newOutline = new CourseOutline({
      course,
      textEditor,
      status,
      courseModulePosition,
    });

    await newOutline.save();
    res.status(201).json({ message: 'Course outline created successfully', data: newOutline });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course outline', error: error.message });
  }
};

// Get all course outlines
export const getAllCourseOutlines = async (req, res) => {
  try {
    const outlines = await CourseOutline.find().populate('course');
    res.status(200).json(outlines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course outlines', error: error.message });
  }
};

// Get a specific course outline by ID
export const getCourseOutlineById = async (req, res) => {
  try {
    const { id } = req.params;
    const outline = await CourseOutline.findById(id).populate('course');

    if (!outline) {
      return res.status(404).json({ message: 'Course outline not found' });
    }

    res.status(200).json(outline);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course outline', error: error.message });
  }
};

// Update a course outline
export const updateCourseOutline = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOutline = await CourseOutline.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedOutline) {
      return res.status(404).json({ message: 'Course outline not found' });
    }

    res.status(200).json({ message: 'Course outline updated successfully', data: updatedOutline });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course outline', error: error.message });
  }
};

// Delete a course outline
export const deleteCourseOutline = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOutline = await CourseOutline.findByIdAndDelete(id);

    if (!deletedOutline) {
      return res.status(404).json({ message: 'Course outline not found' });
    }

    res.status(200).json({ message: 'Course outline deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course outline', error: error.message });
  }
};
