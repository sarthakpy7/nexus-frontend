import Hospital from "../models/Hospital.js";

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createHospital = async (req, res) => {
  const hospital = req.body;

  const newHospital = new Hospital(hospital);
  try {
    await newHospital.save();
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//for development only
export const insertManyHospitals = async (req, res) => {
  const hospitals = req.body.hospitals;

  try {
    const result = await Hospital.insertMany(hospitals);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
//for development only
export const deleteAllHospitals = async (req, res) => {
  try {
    await Hospital.deleteMany({});
    res.status(200).json({ message: "All hospitals deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHospitalById = async (req, res) => {
  const { id } = req.params;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHospitalsByArea = async (req, res) => {
  const { area } = req.params;

  try {
    const hospitals = await Hospital.find({ area: area });
    if (!hospitals || hospitals.length === 0) {
      return res
        .status(404)
        .json({ message: "Hospitals in the area not found" });
    }
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
