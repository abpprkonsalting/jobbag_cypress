
import { User } from './user.model';
import { Location } from './location.model';
import { Experience} from './experience.model';

export class Employee {
  id?: number;
  user?: User;
  // scholarchipId: Scholarship;
  rate: number;
  resume: string;
  experiences: Experience[];
  locations: Location[];

  constructor(rate: number, resume: string, experiences?: Experience[], locations?: any[], id?: number) {
    if (id !== undefined) { this.id = id; }
    this.rate = rate;
    this.resume = resume;
    if (experiences !== undefined && experiences.length > 0) {
      this.experiences = experiences.map(exp => new Experience(exp.profession, exp.years));
    } else {
      this.experiences = [];
    }
    if (locations !== undefined && locations.length > 0) {
      this.locations = locations.map(loc => new Location(loc.id, loc.name, loc.isoCode, loc.flagUrl, loc.children, loc.parentId));
    } else { this.locations = []; }
  }

  getDto() {

    // this.id == undefined is when the employee was created in this app as a base for the client to fill it's data. If those data are
    // empty (resume == '', experience & locations lenght equal to 0) then there is nothing to send to the backend; otherwise continue to
    // convert the employee class in a Dto to send to backend.

    if ((this.id === undefined || this.id == null) &&
        (this.resume === '' && this.experiences.length === 0 && this.locations.length === 0 )) {
      return null;
    }

    const exp = this.experiences.map(experience => experience.getDto());

    // For sending the locations to the backend it's not necessary to send the parent / childs structure,
    // just the enumeration of all of theme.
    const workingLocs = this.flatenlocations(this.locations);

    return {
      id: this.id,
      rate: this.rate,
      resume: this.resume,
      experiences: exp,
      locations: workingLocs
    };
  }

  flatenlocations(locations) {
    let locs: Location[] = [];
    locations.forEach(location => {
      if (location.selected === 2) { locs.push(location); }
      locs = locs.concat(this.flatenlocations(location.children));
    });
    return locs;
  }
}
