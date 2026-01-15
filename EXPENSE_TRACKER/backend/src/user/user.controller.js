import Usermodel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = new Usermodel(data);
        await user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createToken = async (user) => {
    const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    };
    const token = await jwt.sign(
        payload,
        process.env.AUTH_SECRET,
        { expiresIn: "1d" }
    );
    return token;
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not Found !" });

        const isLoged = await bcrypt.compare(password, user.password);
        if (!isLoged)
            return res.status(401).json({ message: "Incorrect password!" });

        const token = await createToken(user);

        // ✅ missing response (main error)
        res.json({ message: "Login successful", token });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
