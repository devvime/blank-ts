import prisma from "@common/database/prisma/client";
import authCase from "@useCases/auth/recover-password.case";

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
      const token = authCase.createToken(email, user.id);

      await prisma.passwordRecoveryToken.create({
        data: {
          userId: user.id,
          valid: true,
          token
        }
      });

      let result = await authCase.sendTokenEmail(user.email, token);

      return result;
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