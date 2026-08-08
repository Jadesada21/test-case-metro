import { IsOptional, IsString } from "class-validator";

export class UpdateUserInput {
    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsOptional()
    password?: string


}