import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  senderId: string;
  @IsNumber()
  receiverId: string;
  @IsString()
  content: string;
  @IsString()
  sessionId: string;
}
