
import authController from "@app/controllers/auth.controller";
import { authSessionDTO } from "@app/dtos/auth/session.dto";
import { Router } from "express";

const router = Router();

router.get('/session', authSessionDTO, authController.session);

export default router;