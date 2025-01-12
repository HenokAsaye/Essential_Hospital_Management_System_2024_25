import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetAppointmentsDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}
