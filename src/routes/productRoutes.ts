import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/product", getAllProducts);
router.post("/product", createProduct);
router.delete("/product/:id", deleteProduct);

export default router;
