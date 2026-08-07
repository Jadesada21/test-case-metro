import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class RegisterInput {
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string
}

export class LoginInput {
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    password!: string
}