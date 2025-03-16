import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
      @IsNotEmpty({ message: 'Email should not empty' })
      email: string;
    
      @IsNotEmpty({ message: 'Name should not empty' })
      name: string;
    
      @IsNotEmpty({ message: 'Skills should not empty' })
      @IsArray({ message: 'Skills should be array'})
      @IsString({ message: 'Skills should be string'})
      skills: string;
}
