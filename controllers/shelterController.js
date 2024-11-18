import Shelter from './../models/Shelter.js';
export const createShelter = async (req, res) => {

    try {
        const existingShelter = await Shelter.findOne({ name: req.body.name });
        if (existingShelter) {
            return res.status(400).json({ message: 'A shelter with the same name already exists' });
        }

        const newShelter = new Shelter(req.body);
        await newShelter.save();
        res.status(201).json(newShelter);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create shelter', error: error.message });
    }
};


export const getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.status(200).json(shelters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getShelterById = async (req, res) => {
    try {
        const { shelterId } = req.params;
        const shelter = await Shelter.findById(shelterId);
        
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        
        res.status(200).json(shelter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateShelter = async (req, res) => {
    try {
        const { shelterId } = req.params;
        const updatedShelter = await Shelter.findByIdAndUpdate(shelterId, req.body, { new: true });

        if (!updatedShelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }

        res.status(200).json(updatedShelter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteShelter = async (req, res) => {
    try {
        const { shelterId } = req.params;
        const deletedShelter = await Shelter.findByIdAndDelete(shelterId);

        if (!deletedShelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }

        res.status(200).json({ message: 'Shelter deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const countShelters = async (req, res) => {
    try {
        const count = await Shelter.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSheltersByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const shelters = await Shelter.find({ location });
        res.status(200).json(shelters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
