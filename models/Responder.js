import mongoose from "mongoose";
const { Schema } = mongoose;

const responderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      enum: [
        "firefighter",
        "nurse",
        "doctor",
        "engineer",
        "paramedic",
        "technician",
        "police",
      ],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Responder = mongoose.model("Responder", responderSchema);

export default Responder;
