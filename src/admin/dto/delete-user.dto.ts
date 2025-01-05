import { IsInt } from 'class-validator';

export class DeleteUserDto {
  @IsInt()
  userId: number;
}
