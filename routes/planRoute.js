import express from "express";
import {
  createEmergencyPlan,
  getEmergencyPlansByUser,
  updateEmergencyPlanById,
} from "../controllers/planControlller.js";
import { verifyToken } from "../utils/authUtils.js";
const router = express.Router();

router.post("/user/:userId/emergencyplan", verifyToken, createEmergencyPlan);
router.get(
  "/user/:userId/emergencyplans",
  verifyToken,
  getEmergencyPlansByUser
);
router.put("/:planId", verifyToken, updateEmergencyPlanById);

export default router;
