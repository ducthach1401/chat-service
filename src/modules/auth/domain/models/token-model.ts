export class TokenModel {
  public readonly access_token: string;

  public readonly token_type: string;

  constructor(accessToken: string, tokenType: string) {
    this.token_type = tokenType;
    this.access_token = accessToken;
  }
}
