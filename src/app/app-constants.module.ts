import { environment } from '../environments/environment';

export const constants = {
  baseUrl: environment.production ? 'https://jobbag.ca/' : 'https://jobbag.ca/',
  webUrl: environment.production ? 'web/' : 'web/',
  apiUrl: environment.production ? 'api/' : 'api/',
};
