
import { User } from './user.model';
import { Location } from './location.model';
import {Project } from './project.model';


export class Employer {
  id?: number;
  rate: number;
  //locations: Location[];
  projects?: Project[]

  constructor(rate,projects,id?){
    if (id != undefined) this.id = id;
    this.rate = rate;
    this.projects = projects.map(project => new Project(project.id,project.title, project.description, project.price,
                                  project.estimatedStartDate, project.estimatedEndDate, project.createdAt, project.updatedAt, project.profession, project.projectStatus, this, project.employee));
  }

  getDto(){

    if ((this.id == undefined || this.id == null) && (this.projects !== undefined && this.projects.length == 0 )) {
      return null;
    }

    return {
      'id':this.id,
      'rate':this.rate,
      'projects': this.projects.map(project => project.getDto())
    }
  }
}
