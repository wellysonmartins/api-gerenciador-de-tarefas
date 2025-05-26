import { TeamsController } from "@/controllers/TeamsController";
import { checkRole } from "@/middlewares/checkRole";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { Router } from "express";

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get("/", ensureAuthenticated, teamsController.index);
teamsRoutes.post(
  "/",
  ensureAuthenticated,
  checkRole("admin"),
  teamsController.create
);

export { teamsRoutes };
