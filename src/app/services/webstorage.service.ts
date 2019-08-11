
import { environment } from '../../environments/environment';

import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../infrastructure/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError,of} from 'rxjs';
import { SessionToken } from '../infrastructure/model/sessionToken.model';
import { Profession } from '../infrastructure/model/profession.model';
import { Location } from '../infrastructure/model/location.model';

import {HttpService} from './http.service';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class WebStorageService {

  private httpService: any;
  private _TOKEN_STORAGE_KEY = 'jwt_token';
  private _REMEMBER_ME_STORAGE_KEY = 'remember_me';
  private _FB_STORAGE_KEY = 'facebook';
  private _FIRST_TIME_CREDENTIALS_STORAGE_KEY = 'first_time_credentials';
  private _USER_CONFIRMED_STORAGE_KEY = 'user_confirmed';
  private _sessionToken:  SessionToken = new SessionToken();

  user: User = undefined;
  professions: Profession[] = undefined;
  locations: Location[] = undefined;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService, @Inject(SESSION_STORAGE) private sessionStorage, httpService: HttpService) {
    if (!environment.production) {
      import('./http.service.dev').then(module => {
        this.httpService = new module.HttpService();
      });
    }
    else {
      this.httpService = httpService;
    }
  }

  public getUser(): Observable<User> {

    if (this.user != undefined) return of(this.user);

    if (this.localStorage.has(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY)) {

      const user = this.localStorage.get(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY);
      return of(user);
    }
    else if (this.sessionStorage.has(this._FB_STORAGE_KEY)) {

      this.sessionStorage.remove(this._FB_STORAGE_KEY);
      return of(this.parseUserFromDocumentCookie());
    }
    else if (this.sessionStorage.has(this._TOKEN_STORAGE_KEY)) {

      // Si el token está en sessionStorage sacarlo de ahí
      this._sessionToken = this.sessionStorage.get(this._TOKEN_STORAGE_KEY);
      if (!this._sessionToken.jwtAuth) return of(this.parseUserFromDocumentCookie());
      return of(this.setUserFromToken(this._sessionToken.token));
    }
    else if (this.localStorage.has(this._TOKEN_STORAGE_KEY)) {

      // Sino buscar en localstorage
      this._sessionToken = this.localStorage.get(this._TOKEN_STORAGE_KEY);
      if (!this._sessionToken.jwtAuth) return of(this.parseUserFromDocumentCookie());
      return of(this.setUserFromToken(this._sessionToken.token));
    }
    else {

      // Sino entonces limpiar todos los storages.
      return this.logout();
    }
  }

  public setUser(user: User) : User {
    this.user = user;
    return this.user;
  }

  public registerUser(user: User) : Observable<User> {

    this.user = user;
    return this.httpService.registerUser(user).pipe(
      switchMap( user => {
        this.saveFirstTimeCredentials({'username':this.user.username,'password':this.user.password});
        return of(this.user);
      }));
  }

  public login(email: string, passwd: string) : Observable<User> {

    return this.httpService.login(email, passwd).pipe(
      switchMap( token => {

        if (this.localStorage.has(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY) && this.localStorage.has(this._USER_CONFIRMED_STORAGE_KEY)){
          this.localStorage.remove(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY);
          this.localStorage.remove(this._USER_CONFIRMED_STORAGE_KEY);
        }
        this.user = this.setUserFromJWToken(token);
        return of(this.user);
      }));
  }

  public loginFacebook() {
    this.saveFacebookSessionTempKey();
    this.httpService.loginFacebook();
  }
  public logout(): Observable<User>{

    this.clearSessionToken();
    document.cookie="loged_in_token=;expires="+new Date('Thu, 01 Jan 1970 00:00:01 GMT')+ ";secure;samesite;path=/";
    this.localStorage.remove(this._REMEMBER_ME_STORAGE_KEY);

    // Aquí tengo que mandar a eliminar la sesión en el servidor (sea por token o por cookie), si es que hay, y después retornar el user vacio.

    this.user = new User();
    return of(this.user);
  }

  public setUserFromJWToken(token): User {
    this._sessionToken.jwtAuth = true;
    this._sessionToken.token = token;
    this.saveToken(this._sessionToken);
    return this.setUserFromToken(token);
  }

  public clearSessionToken() {
    this.sessionStorage.remove(this._TOKEN_STORAGE_KEY);
    this.localStorage.remove(this._TOKEN_STORAGE_KEY);
  }

  public saveRememberMe(rememberme) {
    this.localStorage.set(this._REMEMBER_ME_STORAGE_KEY,rememberme);
  }

  public getSessionToken() {
    return this._sessionToken;
  }

  public saveFirstTimeCredentials(credentials: any){
    this.localStorage.set(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY,credentials);
    this.localStorage.set(this._REMEMBER_ME_STORAGE_KEY,true);
  }

  public checkOtherWindowLogin(): User {

    if (this.localStorage.has(this._TOKEN_STORAGE_KEY)) {
      this._sessionToken = this.localStorage.get(this._TOKEN_STORAGE_KEY);
      return this.setUserFromToken(this._sessionToken.token);
    }
    return new User();
  }

  public getAllProfessions(): Observable<Array<Profession>> {

    if (this.professions != undefined) return of(this.professions);

    return this.httpService.getProfessions();
  }

  public setAllProfessions(professions: Array<Profession>): Array<Profession> {
    this.professions = professions;
    return this.professions;
  }

  public getAllLocations(): Observable<Array<Location>> {

    if (this.locations != undefined) return of(this.locations);

    return this.httpService.getLocations();
  }

  public setAllLocations(locations: Array<Location>): Array<Location> {
    this.locations = locations;
    return this.locations;
  }

  /**************************** Private Methods ******************************/

  private saveToken(sessionToken: SessionToken) {
    let storage = this.localStorage.get(this._REMEMBER_ME_STORAGE_KEY) == true ? this.localStorage : this.sessionStorage;
      storage.set(this._TOKEN_STORAGE_KEY,sessionToken);
  }

  private saveFacebookSessionTempKey() {
    this.clearSessionToken();
    this.sessionStorage.set(this._FB_STORAGE_KEY,true);
  }

  private setUserFromToken(token: string): User {
    const helper = new JwtHelperService();
    this.user = <User> helper.decodeToken(token);
    return this.user;
  }

  private parseUserFromDocumentCookie(): User {
    const cookieArray =  document.cookie.split(";");
    if (cookieArray.length > 0 && cookieArray[0] != ""){
      let filteredCookie: any = cookieArray.map(elem => {
        let splited = elem.split("=");
        splited[0] = splited[0].trim();
        if(splited[0].indexOf('loged_in_token') == 0) {
          document.cookie=splited[0] + "=;expires="+new Date('Thu, 01 Jan 1970 00:00:01 GMT')+ ";secure;samesite;path=/";
          splited[1].trim();
          return splited;
        }
        return null;
      }).filter(elem => elem != null && elem[0] == "loged_in_token");
      if (filteredCookie.length > 0 && filteredCookie[0][1] != '__' && filteredCookie[0][1] != '') {
        this._sessionToken.jwtAuth = false;
        this._sessionToken.token = filteredCookie[0][1];
        this.saveToken(this._sessionToken);
        return this.setUserFromToken(filteredCookie[0][1]);
      }
    }
    return new User();
  }
}
