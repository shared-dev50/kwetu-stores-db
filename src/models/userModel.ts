import pool from "../config/db.js";
import bcrypt from "bcrypt";

interface User {
  id: string;
  name: string;
  role: "cashier" | "manager";
  pin_hash: string;
}

export const findUserByName = async (
  name: string,
): Promise<User | undefined> => {
  const query =
    "SELECT id, name, role, pin_hash FROM users WHERE LOWER(name) = LOWER($1)";
  const { rows } = await pool.query(query, [name]);
  return rows[0];
};

export const registerUser = async (
  name: string,
  pin: string,
  role: "cashier" | "manager",
): Promise<Partial<User>> => {
  const saltRounds = 10;

  const normalizedName = name.trim().toLowerCase();

  const hashedPin = await bcrypt.hash(pin, saltRounds);

  const result = await pool.query(
    "INSERT INTO users (name, pin_hash, role) VALUES ($1, $2, $3) RETURNING id, name, role",
    [normalizedName, hashedPin, role],
  );

  return result.rows[0];
};
