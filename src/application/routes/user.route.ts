import userController from "@app/controllers/user.controller";
import { createUserDTO } from "@app/dtos/user/create.dto";
import { updateUserDTO } from "@app/dtos/user/update.dto";
import { isAuthenticated } from "@middlewares/session.middleware";
import { Router } from "express";

const router = Router();

router.get('/user', isAuthenticated, userController.list);
router.post('/user', isAuthenticated, createUserDTO, userController.create);
router.put('/user/:id', isAuthenticated, updateUserDTO, userController.update);
router.delete('/user/:id', isAuthenticated, userController.delete);

export default router;