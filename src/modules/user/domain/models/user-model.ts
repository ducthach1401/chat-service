export class UserModel {
  public id: string;
  public name: string;
  public username: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: string,
    name: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
  }
}
