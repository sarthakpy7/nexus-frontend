import express from "express";
import {
  createIncident,
  updateIncident,
  getIncidentById,
  getAllIncidents,
  deleteIncident,
  getAllResponders,
  getIncidentsByLocation,
  getIncidentsBySeverity,
} from "../controllers/incidentController.js";
import { isAdmin } from "./../utils/authMiddleware.js";
const router = express.Router();
router.get("/:incidentId", getIncidentById);
router.get("/responders", getAllResponders);
router.get("/incidents", getIncidentsByLocation);
router.get("/incidents", getIncidentsBySeverity);
router.post("/:userId", createIncident);
router.put("/:incidentId", isAdmin, updateIncident);

router.get("/", getAllIncidents);
router.delete("/:incidentId", isAdmin, deleteIncident);

export default router;
