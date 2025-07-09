import prisma from "@common/database/prisma/client";
import { DeleteUser } from "@app/types/user/delete.type";

class RemoveUserService {
  async execute({ user_id }: DeleteUser) {

    if (user_id) {
      const exists = await prisma.user.findFirst({
        where: {
          id: user_id
        }
      });
      if (!exists) {
        throw new Error("User is not found");
      }
      const removeUser = await prisma.user.delete({
        where: {
          id: user_id
        }
      });
      return removeUser;
    }
  }
}

export default new RemoveUserService();