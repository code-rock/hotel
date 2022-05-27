import { Body, Request, Controller, Post, Redirect, UseGuards, Get, ConsoleLogger, Session } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from "./authenticated.guard";
import { Roles } from "src/common/role/role.decorator";
import { ERole } from "src/common/role/role.enum";
import { ILoginForm, IUserInfo } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { EmailBusyException } from "src/errors/email-busy.exception";
// import { IsNotAuthGuard } from "./auth.guard";
import { User } from "src/common/user/user.decorator";
import { UserGuard } from "src/common/user.guard";
import { LocalAuthGuard } from "./local.auth.guard";

@Controller('api')
export class AuthController {
    constructor(private userService: UserService) { }

    // Добавить проверку
    // Доступно только не аутентифицированным пользователям.
    // @UseGuards(AuthGuard('local'))
    // @Redirect('/401', 401) // 401 - если пользователь с указанным email не существет или пароль неверный

    // @UseGuards(LocalAuthGuard)
    @UseGuards(LocalAuthGuard)
    @Post('/auth/login/')
    login(
        @Request() req,
        // @Body() body,
        // @User() user,
        @Session() session: Record<string, any>
    )//: IUserInfo {//@Body() body: ILoginForm): IUserInfo {
    {
        // console.log( user, 'req.user')
        return { user: req.user, session }
        // session.user = user;
        // return { body, user,session }
        // return {
        //     User: req.user,
        //     msg: 'User logged in',
        //     session
        // };
    }

    // @UseGuards(AuthenticatedGuard)
    // @Get('/protected')
    // getHello(@Request() req): string {
    //     return req.user
    // }
    
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

