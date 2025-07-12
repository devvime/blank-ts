import prisma from "@common/database/prisma/client";
import ApiError from "@shared/errors/api.error";
import authCase from "@useCases/auth/recover-password.case";

class RecoverPasswordService {

  async execute(email: string) {
    try {
      const user = await authCase.findUser(email);
      const token = authCase.createToken(email, user.id);

      await prisma.passwordRecoveryToken.create({
        data: {
          userId: user.id,
          valid: true,
          token
        }
      });

      await authCase.sendTokenEmail(user.email, token);

      return {
        status: 200,
        success: true,
        message: `Recovery token send to email: ${email}`
      };
    } catch (err) {
      throw new ApiError(err);
    }
  }

}

export default new RecoverPasswordService();