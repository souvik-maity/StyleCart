export type UserRole = 'admin' | 'user' | 'guest';

export interface AppRoute {
  path: string;
  component: React.ComponentType<any>;
  allowedRoles: UserRole[];
}