import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetMedicalHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}
