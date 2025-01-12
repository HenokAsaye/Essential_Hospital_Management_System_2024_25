import {IsDateString, IsNotEmpty, IsString,IsNumber} from "class-validator";
export class ScheduleDto {
    @IsNotEmpty()
    @IsString()
    doctorId: string;

    @IsNotEmpty()
    @IsString()
    patientId: string;

    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsString()
    time: string;
}
