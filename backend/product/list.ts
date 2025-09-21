import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
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

export interface ListProductsRequest {
  category?: Query<string>;
  search?: Query<string>;
  limit?: Query<number>;
  offset?: Query<number>;
}

export interface ListProductsResponse {
  products: Product[];
  total: number;
}

// Lists products with optional filtering by category and search.
export const list = api<ListProductsRequest, ListProductsResponse>(
  { expose: true, method: "GET", path: "/products" },
  async (req) => {
    const limit = req.limit || 20;
    const offset = req.offset || 0;
    
    let whereClause = "WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (req.category) {
      whereClause += ` AND category = $${paramIndex}`;
      params.push(req.category);
      paramIndex++;
    }

    if (req.search) {
      whereClause += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${req.search}%`);
      paramIndex++;
    }

    const products = await db.rawQueryAll(`
      SELECT id, name, description, price, category, stock_quantity, image_url, created_at
      FROM products 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, ...params, limit, offset);

    const totalResult = await db.rawQueryRow(`
      SELECT COUNT(*) as count FROM products ${whereClause}
    `, ...params);

    return {
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        price: p.price,
        category: p.category,
        stockQuantity: p.stock_quantity,
        imageUrl: p.image_url || "",
        createdAt: p.created_at,
      })),
      total: totalResult?.count || 0,
    };
  }
);
