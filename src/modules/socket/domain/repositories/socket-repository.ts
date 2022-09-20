export abstract class SocketRepository {
  abstract sendMessage(): Promise<void>;
}
