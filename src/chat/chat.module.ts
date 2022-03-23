import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
})
export class ChatModule {}
