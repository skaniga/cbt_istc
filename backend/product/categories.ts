import { api } from "encore.dev/api";
import db from "../db";

export interface Category {
  name: string;
  count: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Gets all product categories with product counts.
export const getCategories = api<void, CategoriesResponse>(
  { expose: true, method: "GET", path: "/products/categories" },
  async () => {
    const categories = await db.queryAll`
      SELECT category as name, COUNT(*) as count
      FROM products 
      GROUP BY category
      ORDER BY category
    `;

    return {
      categories: categories.map(c => ({
        name: c.name,
        count: Number(c.count),
      })),
    };
  }
);
