import prisma from "@common/database/prisma/client";
import { hash } from "bcryptjs";
import { CreateUser } from "@app/types/user/create.type";

class UpdateUserService {

  async execute(id: string, user: CreateUser) {
    try {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: user.email
        }
      });

      if (!userAlreadyExists) {
        throw new Error("User is not found.");
      }

      const passwordHash = await hash(user.password, 8);
      const result = await prisma.user.update({
        where: {
          id
        },
        data: {
          name: user.name,
          email: user.email,
          password: passwordHash
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      return result;

    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new UpdateUserService();