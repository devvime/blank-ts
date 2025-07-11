import { Request, Response } from "express";
import { CreateUser } from "@app/types/user/create.type";
import listUserService from "@app/services/user/list.service";
import createUserService from "@app/services/user/create.service";
import registerUserService from "@app/services/user/register.service";
import updateUserService from "@app/services/user/update.service";
import deleteUserService from "@app/services/user/delete.service";
import { UpdateUser } from "@app/types/user/update.type";
import { ListUserParams } from "@app/types/user/list.type";

class UserController {

  async list(req: Request, res: Response) {
    const queryParams: ListUserParams = req.query;
    const users = await listUserService.execute(queryParams);
    res.json(users);
  }

  async register(req: Request, res: Response) {
    const user: CreateUser = req.body;
    const result = await registerUserService.execute(user, req);
    res.json(result);
  }

  async create(req: Request, res: Response) {
    const user: CreateUser = req.body;
    const result = await createUserService.execute(user);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const user: UpdateUser = req.body;
    const id = req.params.id;
    const result = await updateUserService.execute(id, user);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const user_id = req.params.id as string;
    const result = await deleteUserService.execute({ user_id });
    res.json(result);
  }

}

export default new UserController();