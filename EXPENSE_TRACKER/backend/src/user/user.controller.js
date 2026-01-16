import Usermodel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ====================== SIGNUP ======================
export const createUser = async (req, res) => {
    try {
        const data = req.body;

        // Hash password once before saving
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const user = new Usermodel(data);
        await user.save();

        // Send response without password
        const { password, ...userWithoutPassword } = user.toObject();
        res.json(userWithoutPassword);
    }
    catch (err) {
        // Catch validation errors (like missing fullname/mobile)
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

// ====================== CREATE JWT ======================
const createToken = async (user) => {
    const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role || "user"
    };

    const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: "1d" });
    return token;
};

// ====================== LOGIN ======================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Usermodel.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not Found !" });

        // Compare password correctly
        const isLoged = await bcrypt.compare(password, user.password);
        if (!isLoged)
            return res.status(401).json({ message: "Incorrect password!" });

        // Create token
        const token = await createToken(user);

        // Set cookie
        res.cookie("authToken", token, {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true,
            secure: process.env.ENVIRONMENT !== "DEV"
        });

        // ✅ Send only message (remove token if you want)
        res.json({ message: "Login successful" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
