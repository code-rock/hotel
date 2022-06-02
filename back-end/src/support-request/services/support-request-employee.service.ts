import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISupportRequestEmployeeService } from "../support-request.dto";
import { SupportRequest, TSupportRequestDocument } from "../schemes/support-request.schema";

// Метод ISupportRequestEmployeeService.getUnreadCount должен возвращать количество сообщений, которые были отправлены пользователем и не отмечены прочитанным.
// Метод ISupportRequestEmployeeService.markMessagesAsRead должен выставлять текущую дату в поле readAt всем сообщениям, которые не были прочитаны и были отправлены пользователем.
// Метод ISupportRequestEmployeeService.closeRequest должен менять флаг isActive на false.
// Оповещения должны быть реализованы через механизм EventEmitter.
@Injectable()
export class SupportRequestEmployeeService { //implements ISupportRequestEmployeeService
    constructor(@InjectModel(SupportRequest.name) private supportRequestModel: Model<TSupportRequestDocument>) {}
    
    async markMessagesAsRead(params) {
        return await this.supportRequestModel.updateMany({ params}, { readAt: new Date() });
    }

    async getUnreadCount(supportRequest) {
        return await (await this.supportRequestModel.findOne({ _id: supportRequest }).exec())
        .messages.filter((message) => !message.readAt)
        .length
    }

    async closeRequest(supportRequest) {
        return await this.supportRequestModel.updateOne({ id: supportRequest }, { isActive: false })
    }
}