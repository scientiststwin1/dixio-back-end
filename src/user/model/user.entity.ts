import { MessageEntity } from 'src/chat/model/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  name: string;

  @OneToMany(() => MessageEntity, (message) => message.user, { lazy: true })
  message: MessageEntity[];
}
