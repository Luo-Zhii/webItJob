import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty({message: 'name should not empty '})
    name: string;

    @IsNotEmpty({message: 'apiPath should not empty '})
    apiPath: string;

    @IsNotEmpty({message: 'method should not empty '})
    method: string;

    @IsNotEmpty({message: 'module should not empty '})
    module: string;
}
