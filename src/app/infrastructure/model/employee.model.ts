
import { User } from './user.model';
import { Location } from './location.model';
import { Experience} from './experience.model';


export class Employee {
  id: number;
  user?: User;
  //scholarchipId: Scholarship;
  rate: number;
  resume: string;
  experience: Experience[];
  workingLocations: Location[];

  constructor(id: number,rate: number,resume: string, experience: Experience[],workingLocations: Location[]){
    this.id = id;
    this.rate = rate;
    this.resume = resume;
    this.experience = experience;
    this.workingLocations = workingLocations;

  }
}
