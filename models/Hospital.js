// models/Hospital.js
import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  contact_number: { type: String, required: true },
  specialties: { type: [String], required: true },
  beds: { type: Number, required: true },
  emergency_services: { type: Boolean, required: true },
  photoUrl: { type: String },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
