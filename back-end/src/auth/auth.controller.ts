import { Body, Request, Controller, Post, Redirect, UseGuards, Get, ConsoleLogger } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from "./authenticated.guard";
import { Roles } from "src/user/role/role.decorator";
import { ERole } from "src/user/role/role.enum";
import { ILoginForm, IUserInfo } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { EmailBusyException } from "src/errors/email-busy.exception";

@Controller('api')
export class AuthController {
    constructor(private userService: UserService) { }

    // Добавить проверку
    // Доступно только не аутентифицированным пользователям.
    // @UseGuards(AuthGuard('local'))
    // @Redirect('/401', 401) // 401 - если пользователь с указанным email не существет или пароль неверный
    @Post('/auth/login/')
    @UseGuards(AuthGuard('local'))
    // @UseGuards(Unauthenticated)
    // @UseGuards(AuthGuard('local'))
    login(@Body() body): IUserInfo {//@Body() body: ILoginForm): IUserInfo {
        console.log(body, 'req.user')
        
        return body;
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

