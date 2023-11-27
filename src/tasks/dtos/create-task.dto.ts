import { IsString, IsBoolean, IsArray, IsOptional } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    active: boolean;

    @IsArray()
    @IsOptional()
    categories?: number[];
}
