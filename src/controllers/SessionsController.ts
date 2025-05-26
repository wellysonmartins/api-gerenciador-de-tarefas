import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign, SignOptions } from "jsonwebtoken";
import { z } from "zod";

class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const options: SignOptions = {
      subject: String(user.id),
      expiresIn: expiresIn as SignOptions["expiresIn"],
    };

    const token = sign({ role: user.role }, secret, options);

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
}

export { SessionsController };
