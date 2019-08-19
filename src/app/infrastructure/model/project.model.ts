import { Employer } from "./employer.model";
import { Employee } from "./employee.model";
import { Profession } from "./profession.model";
import { ProjectStatus } from "./status.model"

export class Project
{
  id: number;
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

  constructor(id,title, description, price, estimatedStartDate, estimatedEndDate, createdAt, updatedAt, profession, projectStatus, employer?, employee? ) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.price = price;
  this.estimatedStartDate = estimatedStartDate;
  this.estimatedEndDate = estimatedEndDate;
  this.createdAt = createdAt;
  this.updatedAt = updatedAt;
  if (employer != null) this.employer = employer;
  if (employee != null) this.employee = employee;
  this.profession = profession;
  this.projectStatus = projectStatus;
  }
}
