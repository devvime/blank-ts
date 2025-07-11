import { sign } from "jsonwebtoken";
import mailer from "@shared/utils/mailer";

class AuthCase {

  createToken(email: string, id: string): string {
    const token = sign({
      email
    }, process.env.JWT_SECRET as string, {
      subject: id,
      expiresIn: "1h"
    });
    return token;
  }

  sendTokenEmail(email: string, token: string) {
    let result = undefined;
    mailer.send({
      to: email,
      subject: 'Recover password',
      text: `Password recovery token: ${token}`
    }).then(() => {
      result = {
        status: 200,
        error: false,
        success: true,
        message: `Recovery token send to email: ${email}`
      }
    }).catch(err => {
      result = {
        error: true,
        success: false,
        status: 500,
        data: err
      }
    });
    return result;
  }

}

export default new AuthCase();