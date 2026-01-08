const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    fullname: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profile: { type: String },
    address: { type: String },
    userType: { type: String, enum: ["admin", "employee"], default: "employee" },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
usersSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", usersSchema);
