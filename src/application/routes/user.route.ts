import userController from "@app/controllers/user.controller";
import { createUserDTO } from "@app/dtos/user/create.dto";
import { registerUserDTO } from "@app/dtos/user/register.dto";
import { updateUserDTO } from "@app/dtos/user/update.dto";
import { requestIP } from "@middlewares/ip.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";
import { Router } from "express";

const router = Router();

router.get('/user', isAuthenticated, userController.list);
router.post('/user', isAuthenticated, createUserDTO, userController.create);
router.post('/user/register', registerUserDTO, requestIP, userController.register);
router.put('/user/:id', isAuthenticated, updateUserDTO, userController.update);
router.delete('/user/:id', isAuthenticated, userController.delete);

export default router;