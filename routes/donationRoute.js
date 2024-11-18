import express from "express";
import {
  donateSupplies,
  getAllDonations,
} from "../controllers/donationController.js";

const router = express.Router();

router.post("/supplies", donateSupplies);
router.get("/", getAllDonations);
export default router;
