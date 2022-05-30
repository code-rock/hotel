import { HttpException } from "@nestjs/common";

export class UserRoleNotSuitableException extends HttpException {
    constructor() {
      super('Pоль пользователя не подходит', 403);
    }
}