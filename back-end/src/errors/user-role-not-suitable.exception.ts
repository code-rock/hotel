import { HttpException, HttpStatus } from "@nestjs/common";

export class UserRoleNotSuitableException extends HttpException {
    constructor() {
      super('Pоль пользователя не подходит', HttpStatus.FORBIDDEN);
    }
}