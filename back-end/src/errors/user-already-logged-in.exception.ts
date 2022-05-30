import { HttpException } from "@nestjs/common";

export class UserAlreadyLogginedInException extends HttpException {
    constructor() {
      super('Пользователь уже авторизован', 401);
    }
}
  