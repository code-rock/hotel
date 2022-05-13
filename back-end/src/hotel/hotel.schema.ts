import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type THotelDocument = Hotel & Document;
	
@Schema()
export class Hotel {
    @Prop({ required: true, unique: true })
    _id: ObjectId;

    @Prop({ required: true, unique: false })
    title: ObjectId;

    @Prop({ required: false, unique: false })
    description: string;

    @Prop({ required: true, unique: false })
    createdAt: Date;

    @Prop({ required: true, unique: false })
    updatedAt: Date;	
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);