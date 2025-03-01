/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name should not empty' })
  name: string;

  @IsNotEmpty({ message: 'Address should not empty' })
  address: string;

  @IsNotEmpty({ message: 'Description should not empty' })
  description: string;
}
