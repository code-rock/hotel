import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type THotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
    @Prop({ required: true, unique: false })
    hotel: [{ type: ObjectId, ref: 'Hotel' }]

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
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);