/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UniqueValidator } from '@/auth/decorator/unique_user';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

export class CreateUserDto {

  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email should not empty' })
  @Validate(UniqueValidator, ['email'], {
          message: 'emailAlreadyExists',
  })
  email: string;

  @IsNotEmpty({ message: 'Password should not empty' })
  password: string;

  @IsNotEmpty({ message: 'Name should not empty' })
  name: string;

  @IsNotEmpty({ message: 'Address should not empty' })
  address: string;

  @IsNotEmpty({ message: 'Role should not empty' })
  role: string;
}
