
import { User } from './user.model';
import { Location } from './location.model';
import {Project } from './project.model';


export class Employer {
  id: number;
  user?: User;
  rate: number;
  //workingLocations: Location[];
  projects?: Project[]

  constructor(id,rate,projects?,user?){
    this.id = id;
    this.rate = rate;
    if (projects != null) this.projects = projects;
    if (user != null) this.user = user;
  }
}
