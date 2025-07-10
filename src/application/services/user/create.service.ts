import prisma from "@common/database/prisma/client";
import { hash } from "bcryptjs";
import { CreateUser } from "@app/types/user/create.type";

class CreateUserService {

  async execute(user: CreateUser) {
    try {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          email: user.email
        }
      });

      if (userAlreadyExists) {
        throw new Error("Email already exists.");
      }

      const passwordHash = await hash(user.password, 8);

      const result = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: passwordHash
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true
        }
      });

      return {
        status: 200,
        success: true,
        error: false,
        message: "User registered successfull.",
        data: result
      };

    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new CreateUserService();