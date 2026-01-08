const User = require("../model/user.model");
const dbServices = require("../services/db.services");

// GET all users
const getData = async (req, res) => {
  try {
    const users = await dbServices.findAllRecord(User);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single user
const getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await dbServices.findRecordById(id, User);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE user
const createData = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0)
      return res.status(400).json({ success: false, message: "Empty request body" });

    // Check duplicates
    if (data.email && (await User.findOne({ email: data.email })))
      return res.status(409).json({ success: false, message: "Email already exists!" });
    if (data.mobile && (await User.findOne({ mobile: data.mobile })))
      return res.status(409).json({ success: false, message: "Mobile already exists!" });

    const newUser = await dbServices.createNewRecord(data, User);
    res.status(201).json({ success: true, message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("❌ CREATE ERROR:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// UPDATE user
const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await dbServices.updateRecordById(id, data, User);
    if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE user
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await dbServices.deleteRecordById(id, User);
    if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData,
};
