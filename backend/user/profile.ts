import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

// Gets the current user's profile.
export const getProfile = api<void, User>(
  { expose: true, method: "GET", path: "/user/profile", auth: true },
  async () => {
    const auth = getAuthData()!;
    return {
      id: auth.userID,
      email: auth.email,
      name: "User", // You'd get this from the database
      isAdmin: auth.isAdmin,
    };
  }
);
