import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  status: {
    type: String,
    enum: ["active", "resolved", "expired"],
    default: "active",
  },
  timestamp: { type: Date, default: Date.now },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Alert", AlertSchema);
