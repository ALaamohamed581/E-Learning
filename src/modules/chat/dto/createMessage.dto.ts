import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  senderid: string;
  @IsNumber()
  receiverid: string;
  @IsString()
  content: string;
  @IsString()
  sessionId;
}
