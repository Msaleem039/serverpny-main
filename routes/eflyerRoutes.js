import express from 'express';
import { createEFlyer, deleteEFlyer, getAllEFlyers, getEFlyerById, updateEFlyer } from '../controllers/eflyerController.js';


const router = express.Router();
router.route("/",).post(createEFlyer)
router.route("/",).get(getAllEFlyers)
router.route("/:id",).get(getEFlyerById)
router.route("/:id",).delete(deleteEFlyer)
router.route("/:id",).put(updateEFlyer)
export default router;