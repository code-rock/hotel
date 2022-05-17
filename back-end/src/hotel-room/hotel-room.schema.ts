import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { HotelSchema, Hotel } from '../hotel/hotel.schema';

export type THotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
    @Prop({ required: true, unique: true })
    _id: ObjectId;

    @Prop({ required: true, unique: false, type: HotelSchema, ref: Hotel.name })
    hotel: ObjectId;

    @Prop({ required: false, unique: false })
    description: string;

    @Prop({ required: false, unique: false, default: [] })
    images: string[];

    @Prop({ required: true, unique: false })
    createdAt: Date;

    @Prop({ required: true, unique: false })
    updatedAt: Date;
    
    @Prop({ required: true, unique: false, default: true })
    isEnabled: boolean;
    
}Date;

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);