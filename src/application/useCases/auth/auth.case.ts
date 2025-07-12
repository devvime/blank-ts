import { User } from "@common/database/prisma/generated";
import prisma from "@common/database/prisma/client";
import { sign } from "jsonwebtoken";
import userCase from "../user/user.case";
import ApiError from "@shared/errors/api.error";

class AuthCase {

  async findUser(email: string) {
    const user: User = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new ApiError("Wrong username or password.", 400);
    }

    if (!user.active) {
      await userCase.sendAccountVerifyEmail(email);
      throw new ApiError("User is not active, please access your email and activate your account.", 403);
    }

    return user;
  }

  createAuthToken(user: User) {
    const token = sign({
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "30d"
    });

    return token;
  }

}

export default new AuthCase();