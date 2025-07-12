import { AuthSessionRequest } from "@app/types/auth/session.type";
import { Request, Response } from "express";
import authSessionService from "@app/services/auth/session.service";
import recoverPasswordService from "@app/services/auth/recover.service";
import verifyRecoverTokenAndChangePassword from "@app/services/auth/verify-recover-token.service";
import activeAccountService from "@app/services/auth/active.service";

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

  async verifyRecoverTokenAndChangePassword(req: Request, res: Response) {
    const token = req.params.token as string;
    const password = req.body.password as string;
    const result = await verifyRecoverTokenAndChangePassword.execute(password, token);
    res.json(result);
  }

  async active(req: Request, res: Response) {
    const token = req.params.token as string;
    const result = await activeAccountService.execute(token);
    res.json(result);
  }

}

export default new AuthController();