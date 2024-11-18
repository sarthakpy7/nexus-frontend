import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedResponder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Responder",
    },
    requiredResponderTypes: [
      {
        type: String,
        enum: [
          "firefighter",
          "nurse",
          "doctor",
          "paramedic",
          "engineer",
          "technician",
          "police",
        ],
        required: true,
      },
    ],
    requiredResponderQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Incident = mongoose.model("Incident", IncidentSchema);

export default Incident;
