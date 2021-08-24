
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
  new: string = undefined;

  constructor(id?: number, username?: string, password?: string, name?: string, surname?: string, imageUrl?: string,
              roles?: string[], employee?: Employee, employer?: Employer, email?: string) {
    id != null ? this.id = id : this.id = 0;
    email != null ? this.email = email : this.email = '';
    username != null ? this.username = username : this.username = '';
    name != null ? this.name = name : this.name = '';
    surname != null ? this.surname = surname : this.surname = '';
    imageUrl != null ? this.imageUrl = imageUrl : this.imageUrl = '';
    password != null ? this.password = password : this.password = '';
    roles != null ? this.roles = roles : this.roles = [];
    employee != null ?
                      this.employee = new Employee(employee.rate, employee.resume, employee.experiences, employee.locations, employee.id) :
                      this.employee = null;
    employer != null ? this.employer = new Employer(employer.rate, employer.projects, employer.id) : this.employer = null;
  }

  getDto() {

    return {
      id: this.id,
      username: this.username,
      name: this.name,
      surname: this.surname,
      imageUrl: this.imageUrl,
      employee: this.employee != null ? this.employee.getDto() : null,
      employer: this.employer != null ? this.employer.getDto() : null,
      email: this.email
    };
  }

}
