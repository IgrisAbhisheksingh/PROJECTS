import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";


export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const checkUserbyUserName = await User.findOne({ userName });
    if (checkUserbyUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const checkUserbyEmail = await User.findOne({ email });
    if (checkUserbyEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);

   
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `signup error ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = genToken(user._id);

    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `login error ${error.message}` });
  }
};

export const logOut = async (req, res) => {
  try {
     
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({ message: "LogOut Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `LogOut error ${error.message}` });
  }
};
