import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotAuthenticatedException extends HttpException {
    constructor() {
      super('Пользоватьель не аутентифицирован', HttpStatus.UNAUTHORIZED);
    }
}
  