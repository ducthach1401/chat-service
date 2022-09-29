import { SocketClientModel } from 'src/modules/socket/domain/models/socket-client-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('socket_clients')
export class SocketClientsEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  socket_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toModel(): SocketClientModel {
    return new SocketClientModel(
      this.id,
      this.user_id,
      this.socket_id,
      this.created_at,
      this.updated_at,
    );
  }
}
