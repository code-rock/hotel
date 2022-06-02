import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type TReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({ required: true, unique: false })
    userId: [{ type: ObjectId, ref: 'User' }]

    @Prop({ required: true, unique: false })
    hotelId: [{ type: ObjectId, ref: 'Hotel' }]

    @Prop({ required: true, unique: false })
    roomId: [{ type: ObjectId, ref: 'HotelRoom' }]

    @Prop({ required: true, unique: false })
    dateStart: Date;	

    @Prop({ required: true, unique: false })
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);