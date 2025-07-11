import { AuthSessionRequest } from "@app/types/auth/session.type";
import { Request, Response } from "express";
import authSessionService from "@app/services/auth/session.service";
import recoverPasswordService from "@app/services/auth/recover.service";

class AuthController {

  async session(req: Request, res: Response) {
    const user: AuthSessionRequest = req.body;
    const result = await authSessionService.execute(user);
    res.json(result);
  }

  async recoverPassword(req: Request, res: Response) {
    const email = req.body.email;
    const result = await recoverPasswordService.execute(email);
    res.status(result.status);
    res.json(result);
  }

}

export default new AuthController();