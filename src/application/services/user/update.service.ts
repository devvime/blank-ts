import prisma from "@common/database/prisma/client";
import { UpdateUser } from "@app/types/user/update.type";
import ApiError from "@shared/errors/api.error";

class UpdateUserService {

  async execute(id: string, user: UpdateUser) {
    try {
      const userAlreadyExists = await prisma.user.findFirst({
        where: {
          id
        }
      });

      if (!userAlreadyExists) {
        throw new ApiError("User is not found.");
      }

      const result = await prisma.user.update({
        where: {
          id
        },
        data: {
          name: user.name,
          email: user.email
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      });

      return {
        status: 200,
        success: true,
        error: false,
        message: "User updated successfull.",
        data: result
      };

    } catch (error) {
      throw new ApiError(error);
    }
  }

}

export default new UpdateUserService();