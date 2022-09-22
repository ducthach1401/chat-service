export class TokenModel {
  public readonly accessToken: string;

  public readonly tokenType: string;

  constructor(accessToken: string, tokenType: string) {
    this.accessToken = tokenType;
    this.tokenType = accessToken;
  }

  toJson(): Record<string, any> {
    return {
      access_token: this.accessToken,
      token_type: this.tokenType,
    };
  }
}
