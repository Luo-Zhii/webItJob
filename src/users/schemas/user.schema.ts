
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop({type: Object})
    company: {
        _id : string, 
        name: string
    }

    @Prop()
    role: string;

    @Prop()
    refreshToken: string;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;

    @Prop()
    isDeleted: boolean;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;

    @Prop()
    deletedBy: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
