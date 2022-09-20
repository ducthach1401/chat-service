import { MessageModel } from 'src/modules/socket/domain/models/message-model';
import { UserEntity } from 'src/modules/user/data/database/entities/user-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  send_user_id: string;

  @Column()
  receive_user_id: string;

  @Column()
  data: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.send_messages)
  @JoinColumn({ name: 'send_user_id', referencedColumnName: 'id' })
  send_user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.send_messages)
  @JoinColumn({ name: 'receive_user_id', referencedColumnName: 'id' })
  receive_user: UserEntity;

  toModel(): MessageModel {
    return new MessageModel(
      this.id,
      this.send_user_id,
      this.receive_user_id,
      this.data,
      this.created_at,
      this.updated_at,
    );
  }
}
