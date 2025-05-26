import { Router, Request, Response } from "express";
import { usersRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";
import { teamsRoutes } from "./teams.routes";
import { teamMembersRoutes } from "./team-members.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/auth", authRoutes);
routes.use("/teams", teamsRoutes);
routes.use("/team-members", teamMembersRoutes);

export { routes };
