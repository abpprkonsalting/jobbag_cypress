import { Employer } from './employer.model';
import { Employee } from './employee.model';
import { Profession } from './profession.model';
import { ProjectStatus } from './status.model';

export class Project {
  id?: number;
  title: string;
  description: string;
  price: number;
  estimatedStartDate: Date;
  estimatedEndDate: Date;
  createdAt: Date;
  updatedAt: Date;
  employer?: Employer;
  employee?: Employee;
  profession: Profession;
  projectStatus: ProjectStatus;

  constructor(title, description, price, estimatedStartDate, estimatedEndDate,
              createdAt, updatedAt, profession, projectStatus, employer?, employee?, id? ) {
    if (id != null) { this.id = id; }
    this.title = title;
    this.description = description;
    this.price = price;
    this.estimatedStartDate = estimatedStartDate;
    this.estimatedEndDate = estimatedEndDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    if (employer != null) { this.employer = employer; }
    if (employee != null) { this.employee = employee; }
    this.profession = profession;
    this.projectStatus = projectStatus;
  }

  getDto() {

    return {
      id: (this.id === undefined || this.id == null) ? 0 : this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      estimatedStartDate: this.estimatedStartDate,
      estimatedEndDate: this.estimatedEndDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      employerId: (this.employer === undefined || this.employer == null) ? 0 : this.employer.id,
      employeeId: (this.employee === undefined || this.employee == null) ? 0 : this.employee.id,
      professionId: this.profession.id,
      projectStatusId: this.projectStatus.id
    };
  }
}
