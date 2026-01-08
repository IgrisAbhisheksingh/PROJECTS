// Generic Mongoose service functions
const findAllRecord = async (model) => await model.find().sort({ createdAt: -1 });
const createNewRecord = async (data, model) => await new model(data).save();
const findRecordById = async (id, model) => await model.findById(id);
const updateRecordById = async (id, data, model) => await model.findByIdAndUpdate(id, data, { new: true });
const deleteRecordById = async (id, model) => await model.findByIdAndDelete(id);

module.exports = {
  findAllRecord,
  createNewRecord,
  findRecordById,
  updateRecordById,
  deleteRecordById,
};
