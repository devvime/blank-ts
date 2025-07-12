import prisma from "@common/database/prisma/client";
import ApiError from "@shared/errors/api.error";
import mailer from "@shared/utils/mailer";
import { sign } from "jsonwebtoken";

class UserCase {

  async userExistsVerify(email: string) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (userAlreadyExists) {
      throw new ApiError("Email already exists.");
    }
  }

  createToken(email: string): string {
    const token = sign({
      email
    }, process.env.JWT_SECRET as string, {
      subject: email,
      expiresIn: "1h"
    });
    return token;
  }

  async sendAccountVerifyEmail(email: string) {
    const token = this.createToken(email);
    await mailer.send({
      to: email,
      subject: 'Account verification',
      text: `verify accont with token: ${token}`
    });
  }
}

export default new UserCase();