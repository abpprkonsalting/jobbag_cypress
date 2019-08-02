
export class User {
  email: string;
  username: string;
  name: string;
  surname: string;
  imageUrl: string;
  roles: string[];
  sessionId: string;
  password?: string;

  constructor(){
    this.email = "";
    this.username = "";
    this.name = "";
    this.surname = "";
    this.imageUrl = "";
    this.roles = [];
    this.sessionId ="";
  }
}
