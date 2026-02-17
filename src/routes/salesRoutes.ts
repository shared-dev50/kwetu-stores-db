import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/cash", async (req, res) => {
  const { items, total } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const saleRes = await client.query(
      "INSERT INTO sales (total_amount, payment_method) VALUES ($1, 'cash') RETURNING id",
      [total],
    );
    const saleId = saleRes.rows[0].id;

    for (const item of items) {
      await client.query(
        "INSERT INTO sale_items (sale_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)",
        [saleId, item.product.id, item.quantity, item.product.price],
      );

      await client.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product.id],
      );
    }

    await client.query("COMMIT");
    res.status(200).json({ message: "Sale recorded!", saleId });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ error: "Transaction failed" });
  } finally {
    client.release();
  }
});

export default router;
