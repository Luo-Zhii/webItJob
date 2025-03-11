import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, Validate, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
    @IsNotEmpty({ message: 'Email should not empty' })
    email: string;
    
    @IsNotEmpty({ message: 'userId should not empty' })
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'url should not empty' })
    url: string;

    @IsNotEmpty({ message: 'Status should not empty' })
    status: string;

    @IsNotEmpty({ message: 'companyId should not empty' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId should not empty' })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {

    @IsNotEmpty({ message: 'url should not empty' })
    url: string;

    @IsNotEmpty({ message: 'companyId should not empty' })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId should not empty' })
    jobId: mongoose.Schema.Types.ObjectId;  
}