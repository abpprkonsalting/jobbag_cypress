
import { Employee } from './employee.model';
import { Profession } from './profession.model';


export class Experience {
  profession: Profession;
  years: number;

  constructor(profession: Profession,years: number){
    this.profession = profession;
    this.years = years;
  }
}
