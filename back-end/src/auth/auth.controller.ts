import { Body, Request, Controller, Post, Redirect, UseGuards, Get, ConsoleLogger, Session } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ERole } from "src/common/role/role.enum";
import * as bcrypt from 'bcrypt';
import { EmailBusyException } from "src/errors/email-busy.exception";
import { User } from "src/common/user/user.decorator";
import { NotAuthenticatedGuard } from "./not-authenticated.guard";
import { AuthGuard } from "@nestjs/passport";
import { session } from "passport";
import { IUserInfo } from "./auth.dto";

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
    
    @Get('/auth/logout/')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }


    //Доступно только не аутентифицированным пользователям.
    @Post('/client/register/')
    async singup(@Body() body: { email: string; password: string; name: string; contactPhone: string }): Promise<{ id: string; email: string; name: string }>{
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

