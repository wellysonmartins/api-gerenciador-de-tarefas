import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function checkRole(...allowedRoles: ("admin" | "member")[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new AppError("Acesso não autorizado", 403);
    }

    return next();
  };
}
