export interface IREGIS {
  name: string;
  email: string;
  avater?: string;
  password: string;
}

export interface ActivationToken {
  code: string;
  token: string;
}
