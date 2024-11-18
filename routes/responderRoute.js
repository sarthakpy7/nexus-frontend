import express from "express";
import {
  createResponder,
  getAllResponders,
  getResponderById,
  updateResponder,
  deleteResponder,
} from "../controllers/responderController.js";

import { isVolunteer } from "./../utils/isVolunteer.js";
const router = express.Router();

router.get("/:id", getResponderById);
router.put("/:id", updateResponder);
router.delete("/:id", deleteResponder);
router.post("/", isVolunteer, createResponder);
router.get("/", getAllResponders);
export default router;
