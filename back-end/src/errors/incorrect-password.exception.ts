import { HttpException } from "@nestjs/common";

export class IncorrectPasswordException extends HttpException {
    constructor() {
      super('Неправильно введен пароль', 401);
    }
}
  