import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import db from "../db";

// Removes an item from the user's cart.
export const remove = api<{ id: number }, void>(
  { expose: true, method: "DELETE", path: "/cart/:id", auth: true },
  async ({ id }) => {
    const auth = getAuthData()!;
    const userId = parseInt(auth.userID);

    const result = await db.queryRow`
      DELETE FROM cart_items 
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;

    if (!result) {
      throw APIError.notFound("cart item not found");
    }
  }
);
