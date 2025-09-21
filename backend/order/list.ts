import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

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

export interface OrdersResponse {
  orders: Order[];
}

// Gets all orders for the authenticated user.
export const list = api<void, OrdersResponse>(
  { expose: true, method: "GET", path: "/orders", auth: true },
  async () => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    const orders = await db.queryAll`
      SELECT id, total_amount, status, shipping_address, created_at
      FROM orders 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    const ordersWithItems: Order[] = [];

    for (const order of orders) {
      const items = await db.queryAll`
        SELECT 
          oi.product_id,
          oi.quantity,
          oi.price,
          p.name as product_name
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ${order.id}
      `;

      const orderItems: OrderItem[] = items.map(item => ({
        productId: item.product_id,
        productName: item.product_name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));

      ordersWithItems.push({
        id: order.id,
        totalAmount: order.total_amount,
        status: order.status,
        shippingAddress: order.shipping_address,
        items: orderItems,
        createdAt: order.created_at,
      });
    }

    return { orders: ordersWithItems };
  }
);
