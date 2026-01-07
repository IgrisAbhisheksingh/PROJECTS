require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_URL;

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const findAllRecord = async (schema) => {
  return await schema.find();
};

const createNewRecord = async (data, schema) => {
  return await new schema(data).save();
};

const updateRecord = async (id, data, schema) => {
  return await schema.findByIdAndUpdate(id, data, { new: true });
};

const deleteRecord = async (id, schema) => {
  return await schema.findByIdAndDelete(id);
};

module.exports = {
  findAllRecord,
  createNewRecord,
  updateRecord,
  deleteRecord,
};
