import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ILoginForm } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from "src/errors/user-not-found.exception";
import { IncorrectPasswordException } from "src/errors/incorrect-password.exception";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userService.findByEmail(email);
  //   const passwordValid = await bcrypt.compare(password, user.passwordHash);
  //   if (user && passwordValid) {
  //     const { passwordHash, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  async validateUser({ email, password }: ILoginForm): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    console.log(passwordValid, 'passwordValid')
    if (user && passwordValid) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
    // const user = await this.userService.findByEmail(email);
    // if (!user) null; //throw new UserNotFoundException();
    // const passwordValid = await bcrypt.compare(password, user.passwordHash);
    // if (!passwordValid) null;// throw new IncorrectPasswordException();
    // const { passwordHash, ...result } = user;
    // return result
  }
}