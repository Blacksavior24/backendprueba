import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    name: string;

    @IsArray()
    @IsOptional()
    tasks?: number[];
}