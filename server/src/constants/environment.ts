export class SecretKeys {
  static readonly JWT_SECRET: string = process.env.JWT_SECRET || "jwt-secret";
}
