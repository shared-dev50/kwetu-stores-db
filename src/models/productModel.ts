import pool from "../config/db.js";

export const getAllProductsService = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

export const createProductService = async (product: {
  barcode: string;
  name: string;
  price: number;
}) => {
  const result = await pool.query(
    `INSERT INTO products (barcode, name, price)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [product.barcode, product.name, product.price],
  );

  return result.rows[0];
};

export const deleteProductService = async (id: number) => {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);

  return (result.rowCount ?? 0) > 0;
};
