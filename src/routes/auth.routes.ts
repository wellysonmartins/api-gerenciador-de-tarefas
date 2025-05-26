import { SessionsController } from "@/controllers/SessionsController";
import { Router } from "express";

const authRoutes = Router();
const sessionsController = new SessionsController();

authRoutes.post("/sessions", sessionsController.create);

export { authRoutes };
