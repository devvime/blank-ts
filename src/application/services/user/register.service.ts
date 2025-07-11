import prisma from "@common/database/prisma/client";
import { hash } from "bcryptjs";
import { RegisterUser } from "@app/types/user/register.type";
import { Request } from "express";
import userCase from "@app/useCases/user/user.case";

class RegisterUserService {

  async execute(user: RegisterUser, req: Request) {
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
          ip: req.userIP
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true
        }
      });

      await userCase.sendAccountVerifyEmail(user.email);

      return {
        status: 200,
        success: true,
        error: false,
        message: `User registered successfull. Access your email (${user.email}) and verify your user account.`,
        data: result
      };

    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new RegisterUserService();