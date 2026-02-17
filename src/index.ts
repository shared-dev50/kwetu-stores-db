import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import errorHandling from "./middlewares/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
// import webhookRoutes from "./routes/webhookRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// 2. STRIPE WEBHOOK

// app.use("/api/webhook", webhookRoutes);

// 3. PARSING MIDDLEWARE
app.use(express.json());

// 4. STANDARD ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/sales", salesRoutes);

// 5. TEST CONNECTION & ERRORS
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
