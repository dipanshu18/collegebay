import type { Request } from "express";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: "USER" | "ADMIN";
    }; // Extend Request with a 'user' property
  }
}
