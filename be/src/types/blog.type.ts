import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogInput {
    @IsString()
    @IsNotEmpty()
    title!: string

    @IsOptional()
    @IsString()
    content!: string
}

export class UpdateBlogInput {
    @IsOptional()
    @IsString()
    title?: string

    @IsString()
    @IsOptional()
    content?: string
}

export interface SearchQuery {
    search?: string
}