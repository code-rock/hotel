import { Body, Controller, Post, Query, Redirect } from "@nestjs/common";
import { ICreateUserResponse, ISearchUserParams, IUsers } from "./user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Controller('api')
export class UserController {
    constructor(private userService: UserService) { }

    // Добавить валидацию что пользователь админ
    // Обработать ошибки
    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользоватьель не admin
    @Redirect('/401', 401)
    @Redirect('/403', 403)
    @Post('/admin/users/')
    async createBook(@Body() body: User): Promise<ICreateUserResponse> {
        return this.userService.create(body).then(res => ({
            id: res._id.toString(),
            email: res.email,
            name: res.name,
            contactPhone: res.contactPhone,
            role: res.role,
        }));
    }

    // Добавить валидацию что пользователь админ
    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользоватьель не admin
    @Post('/admin/users/')
    async adminGetUsers(@Query() query: ISearchUserParams): Promise<IUsers[]> {
        return this.userService.findAll(query).then(res => res.map(user => ({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone
        })))
    }

    // Добавить валидацию что пользователь менеджер
    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользоватьель не admin
    @Post('/admin/manager/')
    async managerGetUsers(@Query() query: ISearchUserParams): Promise<IUsers[]> {
        return this.userService.findAll(query).then(res => res.map(user => ({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone
        })))
    }
}