import {IsEmpty,IsString,IsOptional,IsNumber,IsEnum} from 'class-validator';

export class SearchDto {
    patientId?:string;
    name?:string;
}