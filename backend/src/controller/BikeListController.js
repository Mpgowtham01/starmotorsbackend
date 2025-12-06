import BikeModel from "../Modal/BikeModel.js";


// CREATE Bike
export const createBike = async (req, res) => {
  try {
    const bike = new BikeModel(req.body);
    const saved = await bike.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET All Bikes
export const getAllBikes = async (req, res) => {
  try {
    const bikes = await BikeModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bikes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET Single Bike By ID
export const getBikeById = async (req, res) => {
  try {
    const bike = await BikeModel.findById(req.params.id);
    if (!bike) return res.status(404).json({ success: false, message: "Bike not found" });

    res.status(200).json({ success: true, data: bike });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE Bike
export const updateBike = async (req, res) => {
  try {
    const updated = await BikeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated data
    );

    if (!updated) return res.status(404).json({ success: false, message: "Bike not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE Bike
export const deleteBike = async (req, res) => {
  try {
    const deleted = await BikeModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Bike not found" });

    res.status(200).json({ success: true, message: "Bike deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
