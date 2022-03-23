import { UserEntity } from 'src/user/model/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('int', { nullable: false })
  sender_id: number;

  @Column('varchar', { length: '255', nullable: false })
  message_content: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { eager: true })
  @JoinColumn()
  user: UserEntity;
}
