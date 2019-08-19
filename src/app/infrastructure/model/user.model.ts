
import { Employee } from './employee.model';
import { Employer } from './employer.model';

export class User {
  id: number;
  username: string;
  password?: string;
  name: string;
  surname: string;
  imageUrl: string;
  roles: string[];
  employee?: Employee;
  employer?: Employer;

  email: string;
  constructor(){
    this.email = "";
    this.username = "";
    this.name = "";
    this.surname = "";
    this.imageUrl = "";
    this.roles = [];
    this.employee = null;
  }
}
