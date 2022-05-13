import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type TReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({ required: true, unique: true })
    _id: ObjectId;

    @Prop({ required: true, unique: false })
    userId: ObjectId;

    @Prop({ required: true, unique: false })
    hotelId: ObjectId;

    @Prop({ required: true, unique: false })
    roomId: ObjectId;

    @Prop({ required: true, unique: false })
    dateStart: Date;	

    @Prop({ required: true, unique: false })
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);