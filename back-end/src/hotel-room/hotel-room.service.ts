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
    
    findById(id, isEnabled = true) {
        return isEnabled ? this.hotelRoomModel.findById(id).exec() : undefined
    }

    search(props, params) {
        return this.hotelRoomModel.find({ ...props, isEnabled: true }, null, params).exec();
    } 

    update(id, data) {
        return this.hotelRoomModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    }
}
