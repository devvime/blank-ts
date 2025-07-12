import prisma from "@common/database/prisma/client";
import { hash } from "bcryptjs";
import { CreateUser } from "@app/types/user/create.type";
import userCase from "@app/useCases/user/user.case";
import ApiError from "@shared/errors/api.error";

class CreateUserService {

  async execute(user: CreateUser) {
    try {
      await userCase.userExistsVerify(user.email);

      const passwordHash = await hash(user.password, 8);

      const result = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: passwordHash,
          superUser: false,
          active: false,
          ip: ''
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
      throw new ApiError(error);
    }
  }

}

export default new CreateUserService();