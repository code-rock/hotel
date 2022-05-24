import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ERole } from './role/role.enum';

export type TUserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: false })
    passwordHash: string;

    @Prop({ required: true, unique: false })
    name: string;

    @Prop({ required: false, unique: false })
    contactPhone: string;	

    @Prop({ required: true, unique: false, default: ERole.CLIENT, enum: ERole })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);