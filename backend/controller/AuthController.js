import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

export const register = async (req, res) => {
  try {
    
    const { name, email, password , role } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed ,role:role || 'user' });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
