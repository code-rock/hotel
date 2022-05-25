import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor() {
      super('Пользователь не найден', 478); // Код придумай нормальный
    }
}
  