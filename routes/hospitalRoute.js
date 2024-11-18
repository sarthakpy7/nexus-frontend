// routes/hospitals.js
import express from "express";
import {
  createHospital,
  deleteAllHospitals,
  getHospitalById,
  getHospitals,
  getHospitalsByArea,
  insertManyHospitals,
} from "../controllers/hospitalContrller.js";

const router = express.Router();

router.get("/", getHospitals);
router.post("/", createHospital);
router.get("/:id", getHospitalById);
router.get("/area/:area", getHospitalsByArea);
router.post("/bulk", insertManyHospitals);
router.delete("/all", deleteAllHospitals);
export default router;
