import {IsNumber} from 'class-validator';

export class requestDto{
    @IsNumber()
    id:number
}