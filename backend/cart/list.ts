import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
  total: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

// Gets all items in the user's cart.
export const list = api<void, CartResponse>(
  { expose: true, method: "GET", path: "/cart", auth: true },
  async () => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    const items = await db.queryAll`
      SELECT 
        c.id,
        c.product_id,
        c.quantity,
        p.name as product_name,
        p.price as product_price,
        p.image_url as product_image_url
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ${userId}
      ORDER BY c.created_at DESC
    `;

    const cartItems: CartItem[] = items.map(item => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      productPrice: item.product_price,
      productImageUrl: item.product_image_url || "",
      quantity: item.quantity,
      total: item.product_price * item.quantity,
    }));

    const total = cartItems.reduce((sum, item) => sum + item.total, 0);

    return {
      items: cartItems,
      total,
    };
  }
);
