import { HttpException } from "@nestjs/common";

export class EmailBusyException extends HttpException {
    constructor() {
      super('Email уже занят', 400);
    }
  }
  