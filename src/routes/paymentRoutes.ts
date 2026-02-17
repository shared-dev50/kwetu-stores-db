import express from "express";
import Stripe from "stripe";

interface StripeItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description?: string;
    };
    unit_amount: number;
  };
  quantity: number;
}
interface CartItem {
  product: Product;
  quantity: number;
}
interface Product {
  id?: number;
  barcode: string;
  name: string;
  price: string | number;
  created_at?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const items: CartItem[] = req.body.items;

  const line_items = items.map(item => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.product.name },
      unit_amount: Math.round(Number(item.product.price) * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    metadata: {
      cartItems: JSON.stringify(
        items.map(i => ({
          id: i.product.id,
          qty: i.quantity,
        })),
      ),
    },
    success_url: `http://localhost:5173/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/products`,
  });

  res.json({ url: session.url });
});

export default router;
