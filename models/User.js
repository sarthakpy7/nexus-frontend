import mongoose from "mongoose";

export const validRoles = ["volunteer", "admin", "lead"];

const certificationSchema = new mongoose.Schema({
  certificationName: { type: String, required: true },
  certificationDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true },
    role: { type: String, enum: validRoles, required: true },
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String },
    age: { type: Number },
    bloodGroup: { type: String },
    profession: { type: String },
    experience: { type: String },
    mobileNumber: { type: String },
    skills: { type: [String] },
    availabilityDropdown: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    assignedTasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    assignedIncidents: [{ type: mongoose.Types.ObjectId, ref: "Incident" }],
    responderType: { type: String, default: "defaultType" },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
