export interface SendMail {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}
