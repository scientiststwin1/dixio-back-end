import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { MessageRepository } from './repository/message.repository';
import { ChatService } from './chat.service';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository, UserRepository])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
