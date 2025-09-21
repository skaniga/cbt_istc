import { authHandler } from "encore.dev/auth";
import { Header, APIError } from "encore.dev/api";
import jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

interface AuthParams {
  authorization?: Header<"Authorization">;
}

export interface AuthData {
  userID: string;
  email: string;
  isAdmin: boolean;
}

export const auth = authHandler<AuthParams, AuthData>(
  async (params) => {
    const token = params.authorization?.replace("Bearer ", "");
    if (!token) {
      throw APIError.unauthenticated("missing token");
    }

    try {
      const payload = jwt.verify(token, jwtSecret()) as any;
      return {
        userID: payload.userID,
        email: payload.email,
        isAdmin: payload.isAdmin || false,
      };
    } catch (err) {
      throw APIError.unauthenticated("invalid token");
    }
  }
);
