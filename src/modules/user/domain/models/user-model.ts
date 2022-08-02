export class UserModel {
  public name: string;
  public username: string;
  public password: string;

  constructor(data: any) {
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
  }
}
