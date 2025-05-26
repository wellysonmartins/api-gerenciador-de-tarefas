import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { UserRole } from "@prisma/client";
import { hash } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(1, "Nome é obrigatório"),
      email: z.string().email("E-mail inválido"),
      password: z
        .string()
        .min(6, "A senha precisa ter pelo menos 6 caracteres"),
      role: z.enum(["admin", "member"]).optional().default("member"),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      throw new AppError("E-mail já está em uso", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as UserRole,
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  }
}

export { UsersController };
