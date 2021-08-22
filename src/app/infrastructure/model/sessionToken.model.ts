export class SessionToken {
  token: string;
  jwtAuth: boolean;

  constructor() {
    this.jwtAuth = false;
  }
}
