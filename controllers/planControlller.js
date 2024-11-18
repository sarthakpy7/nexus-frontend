import Plan from "../models/Plan.js";

export const createEmergencyPlan = async (req, res, next) => {
  try {
    const {
      familyMembers,
      emergencyContacts,
      evacuationPlan,
      medicalInformation,
      notes,
    } = req.body;

    const userId = req.params.userId;

    const createdBy = req.user.id;

    const emergencyPlan = new Plan({
      user: userId,
      familyMembers,
      emergencyContacts,
      evacuationPlan,
      medicalInformation,
      notes,
      createdBy,
    });

    await emergencyPlan.save();
    res.status(201).json({
      message: "Emergency plan created successfully",
      data: emergencyPlan,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmergencyPlansByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const emergencyPlans = await Plan.find({ user: userId });
    res.status(200).json(emergencyPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmergencyPlanById = async (req, res, next) => {
  try {
    const {
      familyMembers,
      emergencyContacts,
      evacuationPlan,
      medicalInformation,
      notes,
    } = req.body;

    const planId = req.params.planId;

    if (!planId) {
      return res.status(400).json({ message: "Plan ID is required" });
    }
    const existingPlan = await Plan.findOne({ _id: planId });

    if (!existingPlan) {
      return res.status(404).json({ message: "Emergency plan not found" });
    }
    existingPlan.familyMembers = familyMembers;
    existingPlan.emergencyContacts = emergencyContacts;
    existingPlan.evacuationPlan = evacuationPlan;
    existingPlan.medicalInformation = medicalInformation;
    existingPlan.notes = notes;
    const updatedPlan = await existingPlan.save();
    res.status(200).json({
      message: "Emergency plan updated successfully",
      data: updatedPlan,
    });
  } catch (error) {
    next(error);
  }
};
