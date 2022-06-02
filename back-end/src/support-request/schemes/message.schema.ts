import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type TMessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ required: true, unique: false })
    author: [{ type: ObjectId, ref: 'User' }]

    @Prop({ required: true, unique: false })
    sentAt: Date;

    @Prop({ required: true, unique: false })
    text: string;

    @Prop({ required: false, unique: false })
    readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);