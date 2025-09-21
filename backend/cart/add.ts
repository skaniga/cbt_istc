import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
  total: number;
}

// Adds an item to the user's cart.
export const add = api<AddToCartRequest, CartItem>(
  { expose: true, method: "POST", path: "/cart/add", auth: true },
  async (req) => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    // Check if product exists and has sufficient stock
    const product = await db.queryRow`
      SELECT id, name, price, stock_quantity, image_url
      FROM products 
      WHERE id = ${req.productId}
    `;

    if (!product) {
      throw APIError.notFound("product not found");
    }

    if (product.stock_quantity < req.quantity) {
      throw APIError.invalidArgument("insufficient stock");
    }

    // Check if item already exists in cart
    const existingItem = await db.queryRow`
      SELECT id, quantity FROM cart_items 
      WHERE user_id = ${userId} AND product_id = ${req.productId}
    `;

    let cartItem;
    if (existingItem) {
      // Update existing cart item
      const newQuantity = existingItem.quantity + req.quantity;
      if (product.stock_quantity < newQuantity) {
        throw APIError.invalidArgument("insufficient stock for requested quantity");
      }

      cartItem = await db.queryRow`
        UPDATE cart_items 
        SET quantity = ${newQuantity}
        WHERE id = ${existingItem.id}
        RETURNING id, product_id, quantity
      `;
    } else {
      // Create new cart item
      cartItem = await db.queryRow`
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (${userId}, ${req.productId}, ${req.quantity})
        RETURNING id, product_id, quantity
      `;
    }

    if (!cartItem) {
      throw APIError.internal("failed to add item to cart");
    }

    return {
      id: cartItem.id,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImageUrl: product.image_url || "",
      quantity: cartItem.quantity,
      total: product.price * cartItem.quantity,
    };
  }
);
