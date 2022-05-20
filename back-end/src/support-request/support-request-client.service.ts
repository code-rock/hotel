import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TReservationDocument } from "src/reservation/reservation.schema";
import { ISupportRequestClientService } from "./support-request.dto";
import { SupportRequest } from "./support-request.schema";

// Метод ISupportRequestClientService.getUnreadCount должен возвращать количество сообщений, которые были отправлены любым сотрудником поддержки и не отмечены прочитанным.
// Метод ISupportRequestClientService.markMessagesAsRead должен выставлять текущую дату в поле readAt всем сообщениям, которые не были прочитаны и были отправлены не пользователем.
// Оповещения должны быть реализованы через механизм EventEmitter.
@Injectable()
export class SupportRequestClientService { // implements ISupportRequestClientService 
    constructor(@InjectModel(SupportRequest.name) private reservationModel: Model<TReservationDocument>) {}

    createSupportRequest(data) {
        const createdRoom = new this.reservationModel(data);
        return createdRoom.save();
    }

    markMessagesAsRead(params) {

    }

    getUnreadCount(supportRequest) {

    }

}