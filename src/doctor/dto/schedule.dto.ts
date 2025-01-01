import {IsDate, IsNotEmpty, IsString,IsNumber} from "class-validator";

export class ScheduleDto {
    @IsNumber()
    id:number
    @IsNotEmpty()
    doctorId:number;
    @IsNotEmpty()
    patientId:number;
    @IsDate()
    date:Date;
    @IsNotEmpty()
    time:string;
    @IsString()
    @IsNotEmpty()
    status:string;
}