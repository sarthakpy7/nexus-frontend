import express from "express";
import { getAllAlerts, createAlert } from "../controllers/alertController.js";
import { isAdmin } from "../utils/authMiddleware.js";

const router = express.Router();

router.get("/", getAllAlerts);
router.post("/", isAdmin, createAlert);

export default router;
