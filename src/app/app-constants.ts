import { environment } from '../environments/environment';
import { Profession } from './infrastructure/model/profession.model';
import { IconType } from './infrastructure/enums/icon-types.enum';

export const constants = {
  baseUrl: environment.production ? 'https://jobbag.ca/' : 'https://jobbag.ca/',
  webUrl: environment.production ? 'web/' : 'web/',
  apiUrl: environment.production ? 'api/' : 'api/',
  assetsUrl: environment.production ? 'assets/' : 'assets/',
};

export const professions: Profession[] = [
  new Profession(1, [1,2,3,4],'Home Repairs',{type: IconType.MaterialNative,url:'home'}),
  new Profession(2, [1,2,3,4],'Professional Service',{type: IconType.MaterialNative,url:'work'}),
  new Profession(3, [1,2,3,4],'Car Repairs',{type: IconType.MaterialNative,url:'local_taxi'}),
  new Profession(4, [1,2,3,4],'General Repairs',{type: IconType.MaterialNative,url:'build'}),
  new Profession(5, [1,2,3,4],'Air Conditioning',{type: IconType.FromSvgUrl,url:'air_conditioner'}),
  new Profession(6, [1,2,3,4],'General Repairs',{type: IconType.MaterialNative,url:'account_balance'})
];
