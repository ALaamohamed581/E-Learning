import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './createMessage.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
