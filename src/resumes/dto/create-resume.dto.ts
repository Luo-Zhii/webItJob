import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, Validate, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';


class Company {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    name: string;
}

class ResumeCompany {

}
export class CreateResumeDto {
    @IsNotEmpty({ message: 'Email should not empty' })
    email: string;
    
    @IsNotEmpty({ message: 'userId should not empty' })
    @IsMongoId({message: 'userId should be mongo'})
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'url should not empty' })
    url: string;

    @IsNotEmpty({ message: 'Status should not empty' })
    status: string;

    @IsNotEmpty({ message: 'companyId should not empty' })
    @IsMongoId({message: 'companyId should be mongo'})
    companyId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({ message: 'jobId should not empty' })
    @IsMongoId({message: 'jobId should be mongo'})
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