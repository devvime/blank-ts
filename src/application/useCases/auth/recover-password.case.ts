import { sign } from "jsonwebtoken";
import mailer from "@shared/utils/mailer";
import prisma from "@common/database/prisma/client";
import ApiError from "@shared/errors/api.error";

class AuthCase {

  async findUser(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new ApiError("User is not found.", 404);
    }
    return user;
  }

  createToken(email: string, id: string): string {
    const token = sign({ email }, process.env.JWT_SECRET as string, {
      subject: id,
      expiresIn: "1h"
    });
    return token;
  }

  async sendTokenEmail(email: string, token: string) {
    await mailer.send({
      to: email,
      subject: 'Recover password',
      text: 'Password recovery token:',
      html: `<a href="${process.env.MAIL_LINK_RECOVER_PASSWORD_URL}/${token}" target="_blank">Clique here</a> for recover your account password`
    }).catch(err => {
      throw new ApiError(err);
    });
  }

}

export default new AuthCase();