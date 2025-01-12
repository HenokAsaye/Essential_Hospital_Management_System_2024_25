import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Role } from '@prisma/client';  // Import Prisma enum

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role, { message: 'Role must be one of: Patient, Admin, Doctor' })  // Enum validation
  role: Role;

  @IsOptional()
  gender?: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsOptional()
  @IsNumber({}, { message: 'Age must be a number' })
  age?: number;
}