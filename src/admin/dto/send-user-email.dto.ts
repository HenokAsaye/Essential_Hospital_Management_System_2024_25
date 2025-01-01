import { IsEmail } from 'class-validator';

export class SendAdminInviteDto {
  @IsEmail()
  email: string;
}
