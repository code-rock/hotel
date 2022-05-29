import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ILoginForm } from "./auth.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
          })
    }

    async validate(email, password): Promise<any> {
        console.warn(email, password, 'email, password')
        const user = await this.authService.validateUser({ email, password });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}