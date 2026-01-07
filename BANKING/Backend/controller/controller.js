const dbServices = require("../services/db.services");

const createData = async (req, res, schema) => {
  try {
    const data = req.body;

    const dbRes = await dbServices.createNewRecord(data, schema);

    return res.status(201).json({
      message: "Data created successfully",
      success: true,
      data: dbRes,
    });
  } catch (error) {
    // Duplicate key error (email, mobile, etc.)
    if (error.code === 11000) {
      return res.status(422).json({
        message: "Already exists !",
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createData,
};
