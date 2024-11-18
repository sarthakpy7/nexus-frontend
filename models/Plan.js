import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    familyMembers: [
      {
        name: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        gender: String,
        relationship: String,
        specialNeeds: String,
      },
    ],
    emergencyContacts: [
      {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        relationship: String,
        email: String,
      },
    ],
    evacuationPlan: {
      type: mongoose.Schema.Types.Mixed,
    },
    medicalInformation: {
      type: mongoose.Schema.Types.Mixed,
    },
    notes: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", PlanSchema);

export default Plan;
