import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import { z } from "zod";

class TeamsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(1, "Nome do time é obrigatório"),
      description: z.string().optional(),
    });

    const { name, description } = bodySchema.parse(req.body);

    const team = await prisma.team.create({
      data: { name, description },
    });

    return res.status(201).json(team);
  }

  async index(req: Request, res: Response) {
    const teams = await prisma.team.findMany();
    return res.json(teams);
  }
}

export { TeamsController };
