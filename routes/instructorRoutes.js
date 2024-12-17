import express from 'express';
import { createInstructor, deleteInstructor, getInstructor, instructorbyid, updateInstructor } from '../controllers/instructorController.js';



const router = express.Router();
router.post('/', createInstructor);
router.get('/', getInstructor);
router.put('/:id', updateInstructor);
router.get('/:id',instructorbyid);
router.delete('/:id', deleteInstructor);

export default router;
