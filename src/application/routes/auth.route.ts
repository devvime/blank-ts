
import { Router } from "express";
import authController from "@app/controllers/auth.controller";
import { authSessionDTO } from "@app/dtos/auth/session.dto";
import { recoverPasswordDTO } from "@app/dtos/recover-password/recover.dto";

const router = Router();

router.get('/session', authSessionDTO, authController.session);
router.post('/recover-password', recoverPasswordDTO, authController.recoverPassword);

export default router;