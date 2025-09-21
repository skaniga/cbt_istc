import { api, APIError } from "encore.dev/api";
import db from "../db";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl: string;
  createdAt: Date;
}

// Gets a single product by ID.
export const get = api<{ id: number }, Product>(
  { expose: true, method: "GET", path: "/products/:id" },
  async ({ id }) => {
    const product = await db.queryRow`
      SELECT id, name, description, price, category, stock_quantity, image_url, created_at
      FROM products 
      WHERE id = ${id}
    `;

    if (!product) {
      throw APIError.notFound("product not found");
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      stockQuantity: product.stock_quantity,
      imageUrl: product.image_url || "",
      createdAt: product.created_at,
    };
  }
);
