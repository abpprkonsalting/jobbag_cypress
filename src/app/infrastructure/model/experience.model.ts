
import { Employee } from './employee.model';
import { Profession } from './profession.model';


export class Experience {
  profession: Profession;
  years: number;

  constructor(profession: Profession, years: number) {
    this.profession = new Profession(profession.id, profession.name,
                                      profession.avatar, profession.categories, profession.childrenProfessions);
    this.years = years;
  }

  // The profession entities came originally from the backend, so there is not sense in sending all the info
  // back, just send then ids and the related info in this entity, the years.
  getDto() {
    return {
      professionId: this.profession.id,
      years: this.years
    };
  }

}
