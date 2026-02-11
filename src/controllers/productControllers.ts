import {
  createProductService,
  deleteProductService,
  getAllProductsService,
} from "../models/productModel.js";

const handleResponse = (
  res: any,
  status: any,
  message: any,
  data: any = null,
) => {
  res.status(status).json({ status, message, data });
};

export const createProduct = async (req: any, res: any, next: any) => {
  try {
    const { barcode, name, price } = req.body;

    if (!barcode || !name || typeof price !== "number") {
      return handleResponse(res, 400, "Invalid or missing fields");
    }

    const newProduct = await createProductService({ barcode, name, price });

    return handleResponse(res, 201, "Product created successfully", newProduct);
  } catch (err: any) {
    if (err.code === "23505") {
      return handleResponse(res, 409, "Product already exists");
    }
    next(err);
  }
};

export const getAllProducts = async (req: any, res: any, next: any) => {
  try {
    const products = await getAllProductsService();
    return handleResponse(
      res,
      200,
      "Products retrieved successfully",
      products,
    );
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const deleted = await deleteProductService(Number(id));

    if (!deleted) {
      return handleResponse(res, 404, "Product not found");
    }

    return handleResponse(res, 200, "Product deleted successfully");
  } catch (err) {
    next(err);
  }
};
