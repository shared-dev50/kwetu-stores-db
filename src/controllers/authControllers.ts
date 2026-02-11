import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findUserByName, registerUser } from "../models/userModel.js";

export const login = async (req: Request, res: Response) => {
  const name = req.body.name?.trim().toLowerCase();
  const { pin } = req.body;

  try {
    const user = await findUserByName(name);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pin, user.pin_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET || "fallback_secret";

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: "8h",
    });

    res.json({
      user: { id: user.id, name: user.name, role: user.role },
      token,
    });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, pin, role } = req.body;

  try {
    const newUser = await registerUser(name, pin, role);

    res.status(201).json(newUser);
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Registration failed" });
  }
};
