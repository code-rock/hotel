import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISupportRequestEmployeeService } from "./support-request.dto";
import { SupportRequest, TSupportRequestDocument } from "./support-request.schema";

// Метод ISupportRequestEmployeeService.getUnreadCount должен возвращать количество сообщений, которые были отправлены пользователем и не отмечены прочитанным.
// Метод ISupportRequestEmployeeService.markMessagesAsRead должен выставлять текущую дату в поле readAt всем сообщениям, которые не были прочитаны и были отправлены пользователем.
// Метод ISupportRequestEmployeeService.closeRequest должен менять флаг isActive на false.
// Оповещения должны быть реализованы через механизм EventEmitter.
@Injectable()
export class SupportRequestEmployeeService { //implements ISupportRequestEmployeeService
    constructor(@InjectModel(SupportRequest.name) private supportRequestModel: Model<TSupportRequestDocument>) {}
    
    markMessagesAsRead(params) {

    }

    getUnreadCount(supportRequest) {

    }

    closeRequest(supportRequest) {

    }
}