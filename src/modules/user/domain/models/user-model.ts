export class UserModel {
  public readonly id: string;
  public readonly name: string;
  public readonly username: string;
  public readonly password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly socketId: string | undefined;

  constructor(
    id: string,
    name: string,
    username: string,
    password: string,
    socketId: string | undefined,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.socketId = socketId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      socket_id: this.socketId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
