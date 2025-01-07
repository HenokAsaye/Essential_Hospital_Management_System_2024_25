import { IsEmail, IsNotEmpty, IsString, MinLength,IsOptional,IsEnum } from 'class-validator';

export class SignupDto {
@IsString()
@IsNotEmpty()
name:string;


@IsEmail()
@IsNotEmpty()
email:string;


@MinLength(6)
@IsString()
@IsNotEmpty()
password:string;


@IsNotEmpty()
role:string;


@IsOptional()
@IsString()
gender?:string;


@IsString()
contact:string;



@IsOptional()
age?:number;
}
