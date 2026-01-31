import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/productRoutes.js";

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import errorHandling from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandling);

// Test postgress connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
