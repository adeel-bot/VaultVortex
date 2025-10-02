import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setUser } from "../service/auth.js";

export async function handleUserLogout(req, res) {
  try {
        res.clearCookie("uid", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});
      res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = setUser(isUser);
    res.cookie("uid", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only secure in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});


    res.status(200).json({
      id: isUser._id,
      name: isUser.name,
      email: isUser.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
