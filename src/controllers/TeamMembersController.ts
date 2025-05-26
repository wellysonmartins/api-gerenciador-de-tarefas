import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod";

class TeamMembersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      userId: z.number(),
      teamId: z.number(),
    });

    const { userId, teamId } = bodySchema.parse(req.body);

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const teamExists = await prisma.team.findUnique({ where: { id: teamId } });

    if (!teamExists) {
      throw new AppError("Time não encontrado", 404);
    }

    const alreadyMember = await prisma.teamMember.findFirst({
      where: { userId, teamId },
    });

    if (alreadyMember) {
      throw new AppError("Usuário já é membro deste time", 400);
    }

    const teamMember = await prisma.teamMember.create({
      data: { userId, teamId },
    });

    return res.status(201).json(teamMember);
  }

  async remove(req: Request, res: Response) {
    const paramsSchema = z.object({
      memberId: z.coerce.number(),
    });

    const { memberId } = paramsSchema.parse(req.params);

    await prisma.teamMember.delete({
      where: { id: memberId },
    });

    return res.status(204).send();
  }
}

export { TeamMembersController };
