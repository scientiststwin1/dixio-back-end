import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { UserEntity } from 'src/user/model/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { WsResponse } from 'src/utility/helper';
import { MessageEntity } from './model/message.entity';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class ChatService {
  constructor(
    private userRepository: UserRepository,
    private messageRepository: MessageRepository,
  ) {}

  async registerUser(name: string): Promise<WsResponse> {
    try {
      const newUser = new UserEntity();
      newUser.name = name;

      await this.userRepository.insert(newUser);

      const messages = await this.messageRepository.find({
        select: ['id', 'message_content', 'user'],
        order: { created_at: 'DESC' },
      });

      const result = { user: newUser, messages: instanceToPlain(messages) };

      return new WsResponse(true, 200, result);

    } catch (error) {
      if (error.code === '23505')
        return new WsResponse(
          false,
          400,
          null,
          null,
          'This name already exist, please enter another name',
        );
      else
        return new WsResponse(
          false,
          400,
          null,
          null,
          'Unexpected error happend',
        );
    }
  }

  async saveMessage(
    user: UserEntity,
    messageContent: string,
  ): Promise<WsResponse> {
    const newMessage = new MessageEntity();
    newMessage.sender_id = user.id;
    newMessage.message_content = messageContent;

    await this.messageRepository.insert(newMessage);

    const result = { ...instanceToPlain(newMessage), user };

    return new WsResponse(true, 300, result);
  }
}
