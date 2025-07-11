import { Request, Response } from "express";
import recoverPasswordService from "@app/services/recover-password/recover.service";

class RecoverPasswordController {

  async recover(req: Request, res: Response) {
    const email = req.body.email;
    const result = await recoverPasswordService.execute(email);
    res.status(result.status);
    res.json(result);
  }

}

export default new RecoverPasswordController();