import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [ChatGateway],
})
export class ChatModule {}
