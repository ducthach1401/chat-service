export abstract class UserRepository {
  abstract get(id: string): Promise<any>;
  abstract update(id: string, data: any): Promise<boolean>;
  abstract register(data: any): Promise<boolean>;
}
