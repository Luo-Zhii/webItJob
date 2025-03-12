
import { User } from '@/auth/decorator/pass_user';
import { Company } from '@/companies/schemas/company.schema';
import { Job } from '@/jobs/schemas/job.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateNested } from 'class-validator';
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

    @Prop({ type: String })
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Company.name })
    companyId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Job.name })
    jobId: mongoose.Schema.Types.ObjectId;

    
    @Prop({
        type: [
          {
            status: { type: String, required: true },
            updatedAt: { type: Date, required: true },
            updatedBy: {
              _id: { type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true },
              email: { type: String, required: true }
            }
          }
        ]
      })
      history: {
        status: string,
        updatedAt: Date,
        updatedBy: {
          _id: mongoose.Schema.Types.ObjectId,
          email: string,
        }
      }[];

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