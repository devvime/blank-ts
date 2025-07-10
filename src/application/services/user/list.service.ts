import prisma from "@common/database/prisma/client";

class ListUserService {

  async execute() {
    try {
      const users = await prisma.user.findMany({
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
      throw new Error(error);
    }
  }

}

export default new ListUserService();