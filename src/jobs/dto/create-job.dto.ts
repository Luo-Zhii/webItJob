import { IsNotEmpty } from "class-validator";

export class CreateJobDto {
    @IsNotEmpty({ message: 'Name should not empty' })
    name: string;

    @IsNotEmpty({ message: 'Skills should not empty' })
    skills: string;

    @IsNotEmpty({ message: 'Location should not empty' })
    location: string;

    @IsNotEmpty({ message: 'Salary should not empty' })
    salary: number;

    @IsNotEmpty({ message: 'Quantity should not empty' })
    quantity: number;

    @IsNotEmpty({ message: 'Level should not empty' })
    level: string;

    @IsNotEmpty({ message: 'Description should not empty' })
    description: string;

}
