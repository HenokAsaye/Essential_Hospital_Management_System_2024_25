import { IsEnum, IsInt } from 'class-validator';
import { requestStatus } from '@prisma/client';

export class HandleDoctorRequestDto {
  @IsInt()
  userId: number;

  @IsEnum(requestStatus)
  status: requestStatus;
}
