import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/user/user.dto';
import { HotelRoom } from '../hotel-room/hotel-room.schema';
import { IHotelService, SearchRoomsParams } from './hotel.dto';
import { Hotel, THotelDocument } from './hotel.schema';

//В методах findById и search флаг isEnabled может принимать только значения:
// true - флаг должен использоваться в фильтрации,
// undefined - флаг должен игнорироваться.
@Injectable()
export class HotelService implements IHotelService {
    constructor(@InjectModel(Hotel.name) private hotelModel: Model<THotelDocument>) {}

    create(data) {
        const createdRoom = new this.hotelModel(data);
        return createdRoom.save();
    }

    findById(id) {
        return this.hotelModel.findById(id).exec();
    }

    search(params) {
        return this.hotelModel.find({}, null, {
            sort: { params }
        }).exec();
    }
}
