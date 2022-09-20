import { MessageEntity } from 'src/modules/socket/data/datasource/entities/message-entity';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  socket_id: string | undefined;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => MessageEntity, (message) => message.send_user)
  send_messages: MessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.receive_user)
  receive_messages: MessageEntity[];

  toModel(): UserModel {
    return new UserModel(
      this.id,
      this.name,
      this.username,
      this.password,
      this.socket_id,
      this.created_at,
      this.updated_at,
    );
  }
}
