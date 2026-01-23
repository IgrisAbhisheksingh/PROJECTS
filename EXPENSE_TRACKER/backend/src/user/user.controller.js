import Usermodel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendMail from "../utils/mail.js";
import { otpTemplate } from "../utils/otp.template.js";
import { generateOTP } from "../utils/generate.otp.js";
import { forgotPasswordTemplate } from "../utils/forgot.template.js";

// Create user
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const user = new Usermodel(data);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Send OTP email
export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const OTP = generateOTP();
    const isEmail = await Usermodel.findOne({ email });
    if (isEmail)
      return res.status(400).json({ message: "Email is Already Register" });

    await sendMail(email, "OTP For Signup", otpTemplate(OTP));

    res.json({ message: "Email Sent Successfully", otp: OTP, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate token
const createToken = async (user) => {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role || "user",
  };
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: "1d" });
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not Found !" });

    const isLoged = await bcrypt.compare(password, user.password);
    if (!isLoged) return res.status(401).json({ message: "Incorrect password!" });

    const token = await createToken(user);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT !== "DEV",
      sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      path: "/",
      maxAge: 86400000, // 1 day
    });

    res.json({ message: "Login successful", role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const token = jwt.sign({ id: user._id }, process.env.FORGOT_TOKEN_SECRET, { expiresIn: "15m" });
    const link = `${process.env.DOMAIN}/forgot-password?token=${token}`;

    await sendMail(email, "Expensen - Forgot Password", forgotPasswordTemplate(user.fullname, link));

    res.json({ message: "Please check your email to reset password" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify Token
export const verifyToken = async (req, res) => {
  try {
    res.json("Verification success");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const encrypted = await bcrypt.hash(password.toString(), 12);
    await Usermodel.findByIdAndUpdate(req.user.id, { password: encrypted });
    res.json("Password changed successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
