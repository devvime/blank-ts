import { Payload } from "@app/types/auth/payload.type";
import prisma from "@common/database/prisma/client";
import ApiError from "@shared/errors/api.error";
import { verify } from "jsonwebtoken";

class ActiveAccountService {
  async execute(token: string) {
    try {
      const verified = verify(token, process.env.JWT_SECRET) as Payload;
      const user = await prisma.user.findFirst({ where: { email: verified['email'] } });

      if (!user) {
        throw new ApiError('User is not found', 404);
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          active: true
        }
      });

      return {
        success: true,
        status: 200,
        message: "Account activated successfull."
      };
    } catch (err) {
      throw new ApiError(err);
    }
  }
}

export default new ActiveAccountService();