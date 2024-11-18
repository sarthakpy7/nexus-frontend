import mongoose from "mongoose";

const shelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    availability: {
      type: Boolean,
      default: true,
    },
    mapUrl: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Shelter = mongoose.model("Shelter", shelterSchema);
export default Shelter;
