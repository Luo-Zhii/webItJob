import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";


class Company {

  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId

  @IsNotEmpty()
  name:string
}



export class CreateJobDto {
    @IsNotEmpty({ message: 'Name should not empty' })
    name: string;

    @IsNotEmpty({ message: 'Skills should not empty' })
    @IsArray({ message: 'Skills should be an array' })
    @IsString({each: true, message: 'Skills shouble be string'})
    skills: string;

    @IsNotEmpty({ message: 'Location should not empty' })
    location: string;

    @IsNotEmpty({ message: 'Salary should not empty' })
    @IsNumber()
    salary: number;

    @IsNotEmpty({ message: 'Quantity should not empty' })
    @IsNumber()
    quantity: number;

    @IsNotEmpty({ message: 'Level should not empty' })
    level: string;

    @IsNotEmpty({ message: 'Description should not empty' })
    description: string;


    @IsNotEmpty({ message: 'startDate should not empty' })
    @Transform(({value}) => new Date(value))
    @IsDate({message: 'startDate should be Date'})
    startDate: Date;

    @IsNotEmpty({ message: 'endDate should not empty' })
    @Transform(({value}) => new Date(value))
    @IsDate({message: 'endDate should be Date'})
    endDate: Date;
    

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company
}
