import { UserModel } from 'src/modules/user/domain/models/user-model';

export class MessageModel {
  public readonly id: string;
  public readonly sendUserId: string;
  public readonly receiveUserId: string;
  public readonly data: string;
  public readonly sendUser: UserModel;
  public readonly receiveUser: UserModel;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    sendUserId: string,
    receiveUserId: string,
    data: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.sendUserId = sendUserId;
    this.receiveUserId = receiveUserId;
    this.data = data;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  toJson(): Record<string, any> {
    return {
      id: this.id,
      send_user_id: this.sendUserId,
      receive_user_id: this.receiveUserId,
      data: this.data,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
