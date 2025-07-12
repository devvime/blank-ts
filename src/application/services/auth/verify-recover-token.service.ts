import { Payload } from "@app/types/auth/payload.type";
import prisma from "@common/database/prisma/client";
import ApiError from "@shared/errors/api.error";
import { hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

class VerifyRecoverTokenAndChangePassword {

  async execute(password: string, token: string) {
    try {
      const verified = verify(token, process.env.JWT_SECRET) as Payload;
      const passwordHash = await hash(password, 8);

      await prisma.user.update({
        where: {
          id: verified.sub
        },
        data: {
          password: passwordHash
        }
      });

      return {
        success: true,
        status: 200,
        message: "Password updated successfull."
      };
    } catch (err) {
      throw new ApiError(err);
    }
  }

}

export default new VerifyRecoverTokenAndChangePassword();