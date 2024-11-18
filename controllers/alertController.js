import Alert from "../models/Alert.js";
export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const createAlert = async (req, res) => {
  const { type, message, location, severity } = req.body;

  const alertData = {
    type,
    message,
    location,
    severity,
  };

  try {
    const newAlert = new Alert(alertData);
    await newAlert.save();
    req.io.emit("newAlert", newAlert);
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
