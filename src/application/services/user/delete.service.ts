import prisma from "@common/database/prisma/client";
import { DeleteUser } from "@app/types/user/delete.type";
import ApiError from "@shared/errors/api.error";

class RemoveUserService {
  async execute({ user_id }: DeleteUser) {
    try {
      if (user_id) {
        const exists = await prisma.user.findFirst({
          where: {
            id: user_id
          }
        });

        if (!exists) {
          throw new ApiError("User is not found");
        }

        const removeUser = await prisma.user.delete({
          where: {
            id: user_id
          }
        });

        return {
          status: 200,
          success: true,
          error: false,
          message: "User deleted successfull.",
          data: removeUser
        };
      }
    } catch (err) {
      throw new ApiError(err);
    }
  }
}

export default new RemoveUserService();