import {IsEmpty,IsString,IsOptional,IsEnum} from 'class-validator';

export class SearchDto {
    @IsString()
    name:string;
}