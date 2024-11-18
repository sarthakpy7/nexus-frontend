import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    assignedVolunteer: { type: mongoose.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    city: { type: String, required: true },
    area: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
