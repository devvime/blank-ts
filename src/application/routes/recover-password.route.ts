
import { Router } from "express";
import { recoverPasswordDTO } from "@app/dtos/recover-password/recover.dto";
import recoverPasswordController from "@app/controllers/recover-password.controller";

const router = Router();

router.post('/recover-password', recoverPasswordDTO, recoverPasswordController.recover);

export default router;