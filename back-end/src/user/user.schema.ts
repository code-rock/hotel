import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type TUserDocument = User & Document;

export enum ERole { 
    Client = 'client',
    Admin = 'admin',
    Manager = 'manager'
}
 
@Schema()
export class User {
    @Prop({ required: true, unique: true })
    _id: ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: false })
    passwordHash: string;

    @Prop({ required: true, unique: false })
    name: string;

    @Prop({ required: false, unique: false })
    contactPhone: string;	

    @Prop({ required: true, unique: false, default: ERole.Client, enum: ERole })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);