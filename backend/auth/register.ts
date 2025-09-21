import { api, APIError } from "encore.dev/api";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";
import db from "../db";

const jwtSecret = secret("JWTSecret");

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
  };
}

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    // Check if user already exists
    const existingUser = await db.queryRow`
      SELECT id FROM users WHERE email = ${req.email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("user with this email already exists");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(req.password, 10);

    // Create user
    const user = await db.queryRow`
      INSERT INTO users (email, name, password_hash)
      VALUES (${req.email}, ${req.name}, ${passwordHash})
      RETURNING id, email, name, is_admin
    `;

    if (!user) {
      throw APIError.internal("failed to create user");
    }

    const token = jwt.sign(
      {
        userID: user.id.toString(),
        email: user.email,
        isAdmin: user.is_admin,
      },
      jwtSecret(),
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        isAdmin: user.is_admin,
      },
    };
  }
);
