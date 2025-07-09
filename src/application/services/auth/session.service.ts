import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prisma from "@common/database/prisma/client";
import { AuthSessionRequest } from "@app/types/auth/session.type";

class AuthSessionService {

  async execute(data: AuthSessionRequest) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: data.email
        }
      });

      if (!user) {
        throw new Error("Wrong username or password.");
      }

      const passwordMatch = await compare(data.password, user?.password);

      if (!passwordMatch) {
        throw new Error("Wrong username or password.");
      }

      const token = sign({
        name: user.name,
        email: user.email
      }, process.env.JWT_SECRET as string, {
        subject: user.id,
        expiresIn: "30d"
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      }
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new AuthSessionService();