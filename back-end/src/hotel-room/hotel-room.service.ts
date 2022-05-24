import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { HotelRoom, THotelRoomDocument } from "./hotel-room.schema"

@Injectable()
export class HotelRoomService implements HotelRoomService {
    constructor(@InjectModel(HotelRoom.name) private hotelRoomModel: Model<THotelRoomDocument>) {}

    create(data) {
        const createdRoom = new this.hotelRoomModel(data);
        return createdRoom.save();
    }
    
    // В методах findById и search флаг isEnabled может принимать только значения:
    // true - флаг должен использоваться в фильтрации,
    // undefined - флаг должен игнорироваться
    findById(id, isEnabled) {
        return isEnabled ? this.hotelRoomModel.findById(id).exec() : undefined
    }

    search(params) {
        const { limit, skip, ...rest} = params
        return this.hotelRoomModel.find(rest, null, { limit, skip }).exec();
    } 

    update(id, data) {
        return this.hotelRoomModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    }
}
