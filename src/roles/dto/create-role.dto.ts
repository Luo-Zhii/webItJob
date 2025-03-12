import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message: 'name should not empty '})
    name: string;

    @IsNotEmpty({message: 'description should not empty '})
    description: string;

    @IsNotEmpty({message: 'isActive should not empty '})
    isActive: boolean;

    @IsNotEmpty({message: 'permissions should not empty '})
    permissions: string;

}
