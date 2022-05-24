import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailBusyException extends HttpException {
    constructor() {
      super('Email уже занят', HttpStatus.BAD_REQUEST);
    }
  }
  