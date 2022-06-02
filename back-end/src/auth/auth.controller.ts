import { Body, Controller, Post, UseGuards, Session } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ERole } from "src/common/role/role.enum";
import * as bcrypt from 'bcrypt';
import { EmailBusyException } from "src/errors/email-busy.exception";
import { User } from "src/common/user/user.decorator";
import { NotAuthenticatedGuard } from "./not-authenticated.guard";
import { AuthGuard } from "@nestjs/passport";
import { ILoginForm, IUserInfo, IUserShortInfo } from "./auth.dto";
import { AuthenticatedGuard } from "./authenticated.guard";

@Controller('api')
export class AuthController {
    constructor(private userService: UserService) { }

    @UseGuards(NotAuthenticatedGuard)
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    login(
        @User() user,
        @Session() session
    ): IUserInfo {
        const { passwordHash, ...rest } = user._doc;
        session.user = rest;

        return {
            email: user._doc.email,
            name: user._doc.name,
            contactPhone: user._doc.contactPhone
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('auth/logout')
    logout( @Session() session): void {
        session.destroy();
    }

    @UseGuards(NotAuthenticatedGuard)
    @Post('/client/register/')
    async singup(@Body() body: IUserInfo & ILoginForm): Promise<IUserShortInfo>{
        const { password, ...rest } = body;
        const salt = 10;
        const hash = bcrypt.hashSync(password, salt);
        return await this.userService
            .create({ ...rest, passwordHash: hash, role: ERole.CLIENT })
            .then(res => ({
                id: res._id.toString(),
                email: res.email,
                name: res.name
            }))
            .catch(err => {
                if (err.keyPattern.email === 1 && err.code === 11000) throw new EmailBusyException();
                else throw new Error(`Необработаная ошибка: ${err}`);
            });
    }
}

