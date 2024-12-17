// controllers/eflyerController.js


import EFlyer from '../models/EFlyer.js';
import { uploadFiles } from '../multer/multerConfig.js';

export const createEFlyer = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
      // Get file paths if files were uploaded
      const eflayerimage = req.files['flyerFile'] ? req.files['flyerFile'][0].path : null;
      const eflyerdata = {
        ...req.body,
        flyerFile:eflayerimage,
      };
      const instructor = new EFlyer(eflyerdata);
      await instructor.save();
      res.status(201).json({ message: 'Course created successfully', instructor });
    } catch (error) {
      res.status(400).json({ message: 'Internal server errror' + error.message });
    }
  });
};





export const getAllEFlyers = async (req, res) => {
    try {
      const eFlyers = await EFlyer.find().populate('category').populate('course');
      res.json(eFlyers);
    } catch (error) {
      console.error("Error fetching E-Flyers:", error);
      res.status(500).json({ error: 'Error fetching E-Flyers' });
    }
  };

  export const getEFlyerById = async (req, res) => {
    try {
      const { id } = req.params;
     console.log(id)
      const eFlyer = await EFlyer.findById(id).populate('category').populate('course');
  
      if (!eFlyer) {
        return res.status(404).json({ error: 'E-Flyer not found' });
      }
  
      res.json(eFlyer);
    } catch (error) {
      console.error("Error fetching E-Flyer by ID:", error); // Logs the actual error
      res.status(500).json({ error: 'Error fetching E-Flyer' });
    }
  };

  
export const deleteEFlyer = async(req,res)=>{
try {
  const eflyer = await EFlyer.findByIdAndDelete(req.params.id)
  if (!eflyer) return res.status(404).json({ error: 'E-Flyer not found' });
   res.status(404).json({
    message: 'E-Flyer deleted successfully'
   })
} catch (error) {
  res.status(500).json({ error: 'Error deleting E-Flyer' });
  
}
}

export const updateEFlyer = async (req, res) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { id } = req.params;

      // Check if the E-Flyer exists
      const existingEFlyer = await EFlyer.findById(id);
      if (!existingEFlyer) {
        return res.status(404).json({ error: 'E-Flyer not found' });
      }
      // Prepare updated data
      const updatedData = { ...req.body };
    
      // If a new file is uploaded, use it; otherwise, keep the existing file path
      if (req.files && req.files['flyerFile']) {
        updatedData.flyerFile = req.files['flyerFile'][0].path;
      } else {
        updatedData.flyerFile = existingEFlyer.flyerFile;
      }
      // Update the E-Flyer with new data
      const updatedEFlyer = await EFlyer.findByIdAndUpdate(id, updatedData, { new: true });

      res.json({ message: 'E-Flyer updated successfully', data: updatedEFlyer });
    } catch (error) {
      console.error("Error updating E-Flyer:", error);
      res.status(500).json({ error: 'Error updating E-Flyer' });
    }
  });
};
