export class UserModel {
  public readonly id: string;
  public readonly name: string;
  public readonly username: string;
  public readonly password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly isOnline: boolean;

  constructor(
    id: string,
    name: string,
    username: string,
    password: string,
    isOnline: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.isOnline = isOnline;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      is_online: this.isOnline,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
