import { HttpException, HttpStatus } from "@nestjs/common";

export class NotUserWithEmailException extends HttpException {
    constructor() {
      super('Пользователь с указанным email не существет', 401);
    }
}
  