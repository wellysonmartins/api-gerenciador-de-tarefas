import { TeamMembersController } from "@/controllers/TeamMembersController";
import { checkRole } from "@/middlewares/checkRole";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { Router } from "express";

const teamMembersRoutes = Router();
const teamMembersController = new TeamMembersController();

teamMembersRoutes.post(
  "/",
  ensureAuthenticated,
  checkRole("admin"),
  teamMembersController.create
);
teamMembersRoutes.delete(
  "/:memberId",
  ensureAuthenticated,
  checkRole("admin"),
  teamMembersController.remove
);

export { teamMembersRoutes };
