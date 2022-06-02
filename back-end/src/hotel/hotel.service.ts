import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHotelService } from './hotel.dto';
import { Hotel, THotelDocument } from './hotel.schema';

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

    search(params: any) {
        const { limit, skip, ...rest } = params;
        return this.hotelModel.find(rest, null, { limit, skip }).exec();
    }

    update(id, info) {
        return this.hotelModel.findByIdAndUpdate(id, info, {
            new: true,
            runValidators: true,
            context: 'query'
        });
    }
}
