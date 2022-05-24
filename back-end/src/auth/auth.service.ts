import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ILoginForm } from "./auth.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser({ email, password }: ILoginForm): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
        throw new NotAcceptableException('Could not find the user');
    } else {
        const passwordValid = await bcrypt.compare(password, user.passwordHash);
        const { passwordHash, ...result } = user;
        console.log(user, result, 'user')
        return passwordValid ? result : null
    }
  }
}