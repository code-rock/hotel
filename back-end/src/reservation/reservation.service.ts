import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IReservation } from "./reservation.dto";
import { Reservation, TReservationDocument } from "./reservation.schema";

//В методах findById и search флаг isEnabled может принимать только значения:
// true - флаг должен использоваться в фильтрации,
// undefined - флаг должен игнорироваться.
@Injectable()
export class ReservationService implements IReservation {
    constructor(@InjectModel(Reservation.name) private reservationModel: Model<TReservationDocument>) {}

    // Метод IReservation.addReservation должен проверять доступен ли номер на заданную дату
    addReservation(data) {
        const createdRoom = new this.reservationModel(data);
        return createdRoom.save();
    }

    removeReservation(id) { 
        this.reservationModel.deleteOne({ _id: id })
        return undefined
    }
    
    getReservations(filter) {
        return this.reservationModel.find(filter, null, {}).exec();
    }
}
