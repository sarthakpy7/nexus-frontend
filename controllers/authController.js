import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { generateToken } from "../utils/authUtils.js";
import Responder from "../models/Responder.js";

dotenv.config();
export const register = async (req, res, next) => {
  try {
    // Check if the username already exists
    const existingUserByUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists
    const existingUserByEmail = await User.findOne({ email: req.body.email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
      age: req.body.age,
      city: req.body.city,
      area: req.body.area,
      isAdmin: req.body.isAdmin || false,
      profession: req.body.profession,
      experience: req.body.experience,
      skills: req.body.skills,
      availabilityDropdown: req.body.availabilityDropdown,
      profilePicture:
        req.body.profilePicture ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Generate a token for the new user
    const token = generateToken({
      id: savedUser._id,
      username: savedUser.username,
    });

    // Respond with the user data and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
  }

  // Pass other errors to the error handling middleware
  next(error);
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = generateToken({ id: user._id, username: user.username });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
