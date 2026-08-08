import { IsNotEmpty, IsString } from "class-validator";


export class CreateCommentInput {
    @IsString()
    @IsNotEmpty()
    content!: string
}

