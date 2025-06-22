export class SecretKeys {
  static readonly JWT_SECRET: string = process.env.JWT_SECRET || "jwt-secret";
  static readonly PORT: Number = Number(process.env.PORT) || 5000;
}
