import prisma from "@common/database/prisma/client";
import { sign } from "jsonwebtoken";
import mailer from "@shared/utils/mailer";

class RecoverPasswordService {

  async execute(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (user === null) {
      return {
        error: true,
        success: false,
        status: 404,
        message: "User is not found."
      }
    }

    try {
      const token = sign({
        email
      }, process.env.JWT_SECRET as string, {
        subject: user.id,
        expiresIn: "1h"
      });

      await prisma.passwordRecoveryToken.create({
        data: {
          userId: user.id,
          valid: true,
          token
        }
      });

      let result = undefined;

      await mailer.send({
        to: user.email,
        subject: 'Recover password',
        text: `Password recovery token: ${token}`
      }, (error, info) => {
        if (error) {
          result = {
            status: 500,
            error: true,
            success: false,
            message: error
          }
        }
      });

      if (result !== undefined) {
        return result;
      }

      return {
        status: 200,
        error: false,
        success: true,
        message: `Recovery token send to email: ${email}`
      }
    } catch (err) {
      return {
        error: true,
        success: false,
        status: 500,
        err
      }
    }
  }

}

export default new RecoverPasswordService();