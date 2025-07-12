import { compare } from "bcryptjs";
import { AuthSessionRequest } from "@app/types/auth/session.type";
import authCase from "@app/useCases/auth/auth.case";
import { User } from "@common/database/prisma/generated";
import ApiError from "@shared/errors/api.error";

class AuthSessionService {

  async execute(data: AuthSessionRequest) {
    try {
      const user: User = await authCase.findUser(data.email);
      const passwordMatch = await compare(data.password, user?.password);

      if (!passwordMatch) {
        throw new ApiError("Wrong username or password.");
      }

      const token = authCase.createAuthToken(user);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      }
    } catch (error) {
      throw new ApiError(error);
    }
  }

}

export default new AuthSessionService();