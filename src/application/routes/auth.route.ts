
import { Router } from "express";
import authController from "@app/controllers/auth.controller";
import { authSessionDTO } from "@app/dtos/auth/session.dto";
import { changePasswordDTO, recoverPasswordDTO } from "@app/dtos/recover-password/recover.dto";

const router = Router();

router.post('/session', authSessionDTO, authController.session);
router.post('/session/recover', recoverPasswordDTO, authController.recoverPassword);
router.post('/session/recover/:token', changePasswordDTO, authController.verifyRecoverTokenAndChangePassword);
router.get('/session/active/:token', authController.active);

export default router;