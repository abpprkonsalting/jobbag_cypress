import { environment } from '../environments/environment';
import { Profession } from './infrastructure/model/profession.model';
import { Location } from './infrastructure/model/location.model';
import { IconType } from './infrastructure/enums/icon-types.enum';

export const constants = {
  baseUrl: environment.production ? 'https://jobbag.ca/' : 'https://jobbag.ca/',
  webUrl: environment.production ? 'web/' : 'web/',
  apiUrl: environment.production ? 'https://jobbag.ca/api/' : 'https://jobbag.ca/api/',
  assetsUrl: environment.production ? 'assets/' : 'assets/',
};

export const professions: Profession[] = [
  new Profession(1, [1,2,3,4],'Home Repairs',{type: IconType.MaterialNative,url:'home'}),
  new Profession(2, [1,2,3,4],'Professional Service',{type: IconType.MaterialNative,url:'work'}),
  new Profession(3, [1,2,3,4],'Technical Services',{type: IconType.MaterialNative,url:'build'}),

  new Profession(4, [1,2,3,4],'Carpintero',{type: IconType.MaterialNative,url:'home'},1),
  new Profession(5, [1,2,3,4],'Albañil',{type: IconType.MaterialNative,url:'home'},1),
  new Profession(6, [1,2,3,4],'Plomero',{type: IconType.MaterialNative,url:'home'},1),

  new Profession(7, [1,2,3,4],'Programador',{type: IconType.MaterialNative,url:'work'},2),
  new Profession(8, [1,2,3,4],'Redes',{type: IconType.MaterialNative,url:'work'},2),
  new Profession(9, [1,2,3,4],'Abogado',{type: IconType.MaterialNative,url:'work'},2),

  new Profession(10, [1,2,3,4],'Informático',{type: IconType.MaterialNative,url:'build'},3),
  new Profession(11, [1,2,3,4],'Mecánico',{type: IconType.MaterialNative,url:'build'},3),
  new Profession(12, [1,2,3,4],'Refrigeración',{type: IconType.MaterialNative,url:'build'},3),
];

export const locations: Location[] = [
  new Location(1,'Canada','ca',''),
  new Location(2,'Vancouver','va','',1),
  new Location(3,'Otawa','ot','',1),
  new Location(4,'España','es',''),
  new Location(5,'Barcelona','ba','',4),
  new Location(6,'Madrid','ma','',4),
  new Location(7,'Cuba','cu',''),
  new Location(8,'Habana','ha','',7),
  new Location(9,'Santiag','sa','',7),
  new Location(10,'Pinar','pr','',7),
];
