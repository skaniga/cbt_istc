import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

export interface CreateOrderRequest {
  shippingAddress: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  items: OrderItem[];
  createdAt: Date;
}

// Creates a new order from the user's cart.
export const create = api<CreateOrderRequest, Order>(
  { expose: true, method: "POST", path: "/orders", auth: true },
  async (req) => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    // Start transaction
    const tx = await db.begin();
    
    try {
      // Get cart items
      const cartItems = await tx.queryAll`
        SELECT 
          c.id as cart_id,
          c.product_id,
          c.quantity,
          p.name as product_name,
          p.price as product_price,
          p.stock_quantity
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ${userId}
      `;

      if (cartItems.length === 0) {
        throw APIError.invalidArgument("cart is empty");
      }

      // Check stock availability
      for (const item of cartItems) {
        if (item.stock_quantity < item.quantity) {
          throw APIError.invalidArgument(`insufficient stock for ${item.product_name}`);
        }
      }

      // Calculate total
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

      // Create order
      const order = await tx.queryRow`
        INSERT INTO orders (user_id, total_amount, status, shipping_address)
        VALUES (${userId}, ${totalAmount}, 'pending', ${req.shippingAddress})
        RETURNING id, total_amount, status, shipping_address, created_at
      `;

      if (!order) {
        throw APIError.internal("failed to create order");
      }

      // Create order items and update stock
      const orderItems: OrderItem[] = [];
      for (const item of cartItems) {
        await tx.exec`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (${order.id}, ${item.product_id}, ${item.quantity}, ${item.product_price})
        `;

        await tx.exec`
          UPDATE products 
          SET stock_quantity = stock_quantity - ${item.quantity}
          WHERE id = ${item.product_id}
        `;

        orderItems.push({
          productId: item.product_id,
          productName: item.product_name,
          quantity: item.quantity,
          price: item.product_price,
          total: item.product_price * item.quantity,
        });
      }

      // Clear cart
      await tx.exec`DELETE FROM cart_items WHERE user_id = ${userId}`;

      await tx.commit();

      return {
        id: order.id,
        totalAmount: order.total_amount,
        status: order.status,
        shippingAddress: order.shipping_address,
        items: orderItems,
        createdAt: order.created_at,
      };
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  }
);
