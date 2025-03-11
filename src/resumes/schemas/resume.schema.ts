
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
    @Prop()
    email: string;

    @Prop({type: Object})
    userId: mongoose.Schema.Types.ObjectId;

    @Prop()
    url: string;

    @Prop()
    status: string;

    @Prop()
    companyId: mongoose.Schema.Types.ObjectId;

    @Prop()
    jobId: string;

    @Prop({type: mongoose.Schema.Types.ObjectId})
    history: {
        status: string,
        updateAt: Date,
        updateBy: {
            _id: mongoose.Schema.Types.ObjectId,
            email: string,
        }
    }[]

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop({type: Object})
    createdBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    } 

    @Prop({type: Object})
    updatedBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    } 

    @Prop({type: Object})
    deletedBy: {
        _id: mongoose.Types.ObjectId, 
        name: string,
    } 

}


export const ResumeSchema = SchemaFactory.createForClass(Resume);