import {IsDateString, IsNotEmpty, IsString,IsNumber} from "class-validator";

export class ScheduleDto {
    @IsNumber()
    doctorId:number;
    @IsDateString()
    date:Date;
    @IsNotEmpty()
    @IsString()
    time:string;
}