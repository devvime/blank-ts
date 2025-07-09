import { AuthSessionRequest } from "@app/types/auth/session.type";
import { Request, Response } from "express";
import authSessionService from "@app/services/auth/session.service";

class AuthController {

  async session(req: Request, res: Response) {
    const user: AuthSessionRequest = req.body;
    const result = await authSessionService.execute(user);
    res.json(result);
  }

}

export default new AuthController();