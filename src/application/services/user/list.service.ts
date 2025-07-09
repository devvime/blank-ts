import prisma from "@common/database/prisma/client";

class ListUserService {

  async execute() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new ListUserService();