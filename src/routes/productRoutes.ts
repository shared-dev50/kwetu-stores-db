import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productControllers.js";
import { authenticate, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getAllProducts);

router.post("/", authenticate, requireRole(["manager"]), createProduct);

router.delete("/:id", authenticate, requireRole(["manager"]), deleteProduct);

export default router;
