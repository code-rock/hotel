import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ICreateUser, ICreateUserResponse, ISearchUserParams, IUsers } from "./user.dto";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { Roles } from "../common/role/role.decorator";
import { ERole } from "../common/role/role.enum";
import { RolesGuard } from "../common/role/role.guard";

@Controller('api')
export class UserController {
    constructor(private userService: UserService) { }
    
    // Обработать ошибки
    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользоватьель не admin
    // @Redirect('/401', 401)
    // @Redirect('/403', 403)
    @Roles(ERole.ADMIN)
    @UseGuards(RolesGuard)
    @Post('/admin/users/')
    async createUser(@Body() body: ICreateUser): Promise<ICreateUserResponse> {
        const salt = 10;
        const hash = bcrypt.hashSync(body.password, salt); console.log(hash, 'hashedPassword ')
        const { password, ...rest } = body;
        return await this.userService
            .create({ ...rest, passwordHash: hash })
            .then(res => ({
                id: res._id.toString(),
                email: res.email,
                name: res.name,
                contactPhone: res.contactPhone,
                role: res.role,
        }));
    }

    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользоватьель не admin
    @Roles(ERole.ADMIN)
    @UseGuards(RolesGuard)
    @Get('/admin/users/')
    async adminGetUsers(@Query() query: ISearchUserParams): Promise<IUsers[]> {
        return this.userService.findAll(query).then(res => res.map(user => ({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone
        })))
    }

    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользоватьель не admin
    @Roles(ERole.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/manager/users/')
    async managerGetUsers(@Query() query: ISearchUserParams): Promise<IUsers[]> {
        return this.userService.findAll(query).then(res => res.map(user => ({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone
        })))
    }
}