/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UniqueValidator } from '@/auth/decorator/unique_user';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, Validate, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class Company {

  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId

  @IsNotEmpty()
  name:string
}

export class CreateUserDto {
  
  @IsNotEmpty({ message: 'Name should not empty' })
  name: string;

  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email should not empty' })
  @Validate(UniqueValidator, ['email'], {
          message: 'emailAlreadyExists',
  })
  email: string;

  @IsNotEmpty({ message: 'Password should not empty' })
  password: string;

  @IsNotEmpty({ message: 'Age should not empty' })
  age: number;

  @IsNotEmpty({ message: 'Gender should not empty' })
  gender: string;

  @IsNotEmpty({ message: 'Address should not empty' })
  address: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company

  @IsNotEmpty({ message: 'Role should not empty' })
  role: string;
}

export class RegisterUserDto {
  
  @IsNotEmpty({ message: 'Name should not empty' })
  name: string;

  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email should not empty' })
  @Validate(UniqueValidator, ['email'], {
          message: 'emailAlreadyExists',
  })
  email: string;

  @IsNotEmpty({ message: 'Password should not empty' })
  password: string;

  @IsNotEmpty({ message: 'Age should not empty' })
  age: number;

  @IsNotEmpty({ message: 'Gender should not empty' })
  gender: string;

  @IsNotEmpty({ message: 'Address should not empty' })
  address: string;

}
