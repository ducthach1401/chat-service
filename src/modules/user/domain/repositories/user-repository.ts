export abstract class UserRepository {
  abstract get(id: string): Promise<any>;
  abstract update(id: string, data: any): Promise<boolean>;
  abstract register(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean>;
}
