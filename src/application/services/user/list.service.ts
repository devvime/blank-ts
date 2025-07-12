import prisma from "@common/database/prisma/client";
import { ListUserParams } from "@app/types/user/list.type";
import ApiError from "@shared/errors/api.error";

class ListUserService {

  async execute(queryParams: ListUserParams) {
    try {
      const users = await prisma.user.findMany({
        where: queryParams,
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      });
      return users;
    } catch (error) {
      throw new ApiError(error);
    }
  }

}

export default new ListUserService();