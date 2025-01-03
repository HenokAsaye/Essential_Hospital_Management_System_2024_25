import { IsString,IsEmail,IsOptional } from "class-validator";

export class AdminDto {
    @IsString()
    @IsOptional()
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}