import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl?: string;
}

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

// Creates a new product (admin only).
export const create = api<CreateProductRequest, Product>(
  { expose: true, method: "POST", path: "/products", auth: true },
  async (req) => {
    const auth = getAuthData()!;
    if (!auth.isAdmin) {
      throw APIError.permissionDenied("admin access required");
    }

    const product = await db.queryRow`
      INSERT INTO products (name, description, price, category, stock_quantity, image_url)
      VALUES (${req.name}, ${req.description}, ${req.price}, ${req.category}, ${req.stockQuantity}, ${req.imageUrl || ""})
      RETURNING id, name, description, price, category, stock_quantity, image_url, created_at
    `;

    if (!product) {
      throw APIError.internal("failed to create product");
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stockQuantity: product.stock_quantity,
      imageUrl: product.image_url || "",
      createdAt: product.created_at,
    };
  }
);
