import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ILoginForm } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from "src/errors/user-not-found.exception";
import { IncorrectPasswordException } from "src/errors/incorrect-password.exception";
import { NotUserWithEmailException } from "src/errors/not-user-with-email.exception";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser({ email, password }: ILoginForm): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotUserWithEmailException();
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) throw new IncorrectPasswordException();
    const { passwordHash, ...result } = user;
    return result;
  }
}