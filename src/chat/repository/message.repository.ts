import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from '../model/message.entity';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
