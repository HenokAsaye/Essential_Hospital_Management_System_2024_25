<<<<<<< HEAD
import {IsEmpty,IsString,IsOptional,IsEnum} from 'class-validator';

export class SearchDto {
    @IsString()
    name:string;
=======
import {IsEmpty,IsString,IsOptional,IsNumber,IsEnum} from 'class-validator';

export class SearchDto {
    patientId?:string;
    name?:string;
>>>>>>> route
}