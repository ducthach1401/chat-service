export class SocketClientModel {
  public readonly id: string;
  public readonly userId: string;
  public readonly socketId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    socketId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.socketId = socketId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  toJson(): Record<string, any> {
    return {
      id: this.id,
      user_id: this.userId,
      socket_id: this.socketId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
