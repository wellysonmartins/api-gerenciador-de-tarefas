import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  role: "admin" | "member";
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não encontrado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub, role } = verify(token, authConfig.jwt.secret) as TokenPayload;

    req.user = {
      id: sub,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}
