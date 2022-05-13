import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Message } from './message.schema';

export type TSupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
    @Prop({ required: true, unique: true })
    _id: ObjectId;

    @Prop({ required: true, unique: false })
    user: ObjectId;

    @Prop({ required: true, unique: false })
    createdAt: Date;

    @Prop({ required: false, unique: false })
    messages: Message[];

    @Prop({ required: false, unique: false })
    isActive: boolean;	
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);