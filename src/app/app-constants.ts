import { environment } from '../environments/environment';

import { Profession } from './infrastructure/model/profession.model';
import { Employee } from './infrastructure/model/employee.model';
import { Employer } from './infrastructure/model/employer.model';
import { Location } from './infrastructure/model/location.model';
import { avatarType } from './infrastructure/enums/icon-types.enum';
import { Experience} from './infrastructure/model/experience.model';
import { Project } from './infrastructure/model/project.model';
import { ProjectStatus } from './infrastructure/model/status.model';

export const constants = {
  baseUrl: environment.production ? 'http://localhost:4200/' : 'http://localhost:4200/',
  webUrl: environment.production ? '/' : '/',
  apiUrl: environment.production ? 'http://localhost:4200/api/' : 'http://localhost:4200/api/',
  assetsUrl: environment.production ? 'assets/' : 'assets/',
};

export const professions: Profession[] = [
  /*new Profession(1,'Home Repairs',{avatarType: avatarType.MaterialNative,url:'home'}),
  new Profession(2,'Professional Service',{avatarType: avatarType.MaterialNative,url:'work'}),
  new Profession(3,'Technical Services',{avatarType: avatarType.MaterialNative,url:'build'}),

  new Profession(4,'Carpintero',{avatarType: avatarType.MaterialNative,url:'home'},1),
  new Profession(5,'Albañil',{avatarType: avatarType.MaterialNative,url:'home'},1),
  new Profession(6,'Plomero',{avatarType: avatarType.MaterialNative,url:'home'},1),

  new Profession(7,'Programador',{avatarType: avatarType.MaterialNative,url:'work'},2),
  new Profession(8,'Redes',{avatarType: avatarType.MaterialNative,url:'work'},2),
  new Profession(9,'Abogado',{avatarType: avatarType.MaterialNative,url:'work'},2),

  new Profession(10,'Informático',{avatarType: avatarType.MaterialNative,url:'build'},3),
  new Profession(11,'Mecánico',{avatarType: avatarType.MaterialNative,url:'build'},3),
  new Profession(12,'Refrigeración',{avatarType: avatarType.MaterialNative,url:'build'},3),*/
];

export const locations: Location[] = [
  new Location(1, 'Canada', 'ca', '', []),
  new Location(2, 'Vancouver', 'va', '', [], 1),
  new Location(3, 'Otawa', 'ot', '', [], 1),
  new Location(4, 'España', 'es', '', []),
  new Location(5, 'Barcelona', 'ba', '', [], 4),
  new Location(6, 'Madrid', 'ma', '', [], 4),
  new Location(7, 'Cuba', 'cu', '', []),
  new Location(8, 'Habana', 'ha', '', [], 7),
  new Location(9, 'Santiago', 'sa', '', [], 7),
  new Location(10, 'Pinar', 'pr', '', [], 7),
];

export const employee: Employee = new Employee(/*75,'resumee',
                                      [
                                        new Experience(
                                            new Profession(4,'Carpintero',{avatarType: avatarType.MaterialNative,url:'home'},1),
                                            5),
                                        new Experience(
                                          new Profession(6,'Plomero',{avatarType: avatarType.MaterialNative,url:'home'},1),
                                          3),
                                          new Experience(
                                            new Profession(5,'Albañil',{avatarType: avatarType.MaterialNative,url:'home'},1),
                                          1),
                                          new Experience(
                                            new Profession(7,'Programador',{avatarType: avatarType.MaterialNative,url:'work'},2),
                                          1),
                                          new Experience(
                                            new Profession(9,'Abogado',{avatarType: avatarType.MaterialNative,url:'work'},2),
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
                                        ])
                                      ],1*/0, '', [], [], 0
                                    );

export const employer: Employer = new Employer(75,
  [/*
  new Project(1,'Proyecto 1',' description del proyecto 1', 25, new Date(), new Date(), new Date(), new Date(),
      new Profession(4,'Carpintero',{avatarType: avatarType.MaterialNative,url:'home'},1),
      new ProjectStatus(1,'abierto',true)
      ),
  new Project(2,'Proyecto 2',' description del proyecto 2', 55, new Date(), new Date(), new Date(), new Date(),
      new Profession(4,'Carpintero',{avatarType: avatarType.MaterialNative,url:'home'},1),
      new ProjectStatus(2,'cerrado',true)
      )
  */], 1);


