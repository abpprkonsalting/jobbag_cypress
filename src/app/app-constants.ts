import { environment } from '../environments/environment';

import { Profession } from './infrastructure/model/profession.model';
import { Employee } from './infrastructure/model/employee.model';
import { Employer } from './infrastructure/model/employer.model';
import { Location } from './infrastructure/model/location.model';
import { IconType } from './infrastructure/enums/icon-types.enum';
import { Experience} from './infrastructure/model/experience.model';
import { Project } from './infrastructure/model/project.model';
import { ProjectStatus } from './infrastructure/model/status.model';

export const constants = {
  baseUrl: environment.production ? 'http://localhost:4200/' : 'http://localhost:4200//',
  webUrl: environment.production ? 'web/' : 'web/',
  apiUrl: environment.production ? 'http://localhost:4200/api/' : 'http://localhost:4200//api/',
  assetsUrl: environment.production ? 'assets/' : 'assets/',
};

export const professions: Profession[] = [
  new Profession(1, [1,2,3,4],'Home Repairs',{iconType: IconType.MaterialNative,url:'home'}),
  new Profession(2, [1,2,3,4],'Professional Service',{iconType: IconType.MaterialNative,url:'work'}),
  new Profession(3, [1,2,3,4],'Technical Services',{iconType: IconType.MaterialNative,url:'build'}),

  new Profession(4, [1,2,3,4],'Carpintero',{iconType: IconType.MaterialNative,url:'home'},1),
  new Profession(5, [1,2,3,4],'Albañil',{iconType: IconType.MaterialNative,url:'home'},1),
  new Profession(6, [1,2,3,4],'Plomero',{iconType: IconType.MaterialNative,url:'home'},1),

  new Profession(7, [1,2,3,4],'Programador',{iconType: IconType.MaterialNative,url:'work'},2),
  new Profession(8, [1,2,3,4],'Redes',{iconType: IconType.MaterialNative,url:'work'},2),
  new Profession(9, [1,2,3,4],'Abogado',{iconType: IconType.MaterialNative,url:'work'},2),

  new Profession(10, [1,2,3,4],'Informático',{iconType: IconType.MaterialNative,url:'build'},3),
  new Profession(11, [1,2,3,4],'Mecánico',{iconType: IconType.MaterialNative,url:'build'},3),
  new Profession(12, [1,2,3,4],'Refrigeración',{iconType: IconType.MaterialNative,url:'build'},3),
];

export const locations: Location[] = [
  new Location(1,'Canada','ca','',[]),
  new Location(2,'Vancouver','va','',[],1),
  new Location(3,'Otawa','ot','',[],1),
  new Location(4,'España','es','',[]),
  new Location(5,'Barcelona','ba','',[],4),
  new Location(6,'Madrid','ma','',[],4),
  new Location(7,'Cuba','cu','',[]),
  new Location(8,'Habana','ha','',[],7),
  new Location(9,'Santiago','sa','',[],7),
  new Location(10,'Pinar','pr','',[],7),
];

export const employee: Employee = new Employee(1,75,'resumee',
                                      [
                                        new Experience(
                                            new Profession(4, [1,2,3,4],'Carpintero',{iconType: IconType.MaterialNative,url:'home'},1),
                                            5),
                                        new Experience(
                                          new Profession(6, [1,2,3,4],'Plomero',{iconType: IconType.MaterialNative,url:'home'},1),
                                          3),
                                          new Experience(
                                            new Profession(5, [1,2,3,4],'Albañil',{iconType: IconType.MaterialNative,url:'home'},1),
                                          1),
                                          new Experience(
                                            new Profession(7, [1,2,3,4],'Programador',{iconType: IconType.MaterialNative,url:'work'},2),
                                          1),
                                          new Experience(
                                            new Profession(9, [1,2,3,4],'Abogado',{iconType: IconType.MaterialNative,url:'work'},2),
                                          1)
                                      ],
                                      [
                                        new Location(1,'Canada','ca','',[
                                          new Location(2,'Vancouver','va','',[],1),
                                          new Location(3,'Otawa','ot','',[],1)
                                        ]),
                                        new Location(7,'Cuba','cu','',[
                                          new Location(8,'Habana','ha','',[],7),
                                          new Location(9,'Santiago','sa','',[],7),
                                        ]),
                                        new Location(4,'España','es','',[]),
                                      ]
                                    );

export const employer: Employer = new Employer(1,75,
  [
  new Project(1,'Proyecto 1',' description del proyecto 1', 25, new Date(), new Date(), new Date(), new Date(),
      new Profession(4, [1,2,3,4],'Carpintero',{iconType: IconType.MaterialNative,url:'home'},1),
      new ProjectStatus(1,'abierto',true)
      ),
  new Project(2,'Proyecto 2',' description del proyecto 2', 55, new Date(), new Date(), new Date(), new Date(),
      new Profession(4, [1,2,3,4],'Carpintero',{iconType: IconType.MaterialNative,url:'home'},1),
      new ProjectStatus(2,'cerrado',true)
      )
  ]);


