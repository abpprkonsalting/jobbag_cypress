
import { environment } from '../../environments/environment';

import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../infrastructure/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError, of} from 'rxjs';
import { SessionToken } from '../infrastructure/model/sessionToken.model';

import { Profession } from '../infrastructure/model/profession.model';
import { Location } from '../infrastructure/model/location.model';
import { Employee } from '../infrastructure/model/employee.model';
import { Employer } from '../infrastructure/model/employer.model';

import {HttpService} from './http.service.dev';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class WebStorageService {

  private httpService: any;
  private _TOKEN_STORAGE_KEY = 'jwt_token';
  private _REMEMBER_ME_STORAGE_KEY = 'remember_me';
  private _FB_STORAGE_KEY = 'facebook';
  private _FIRST_TIME_CREDENTIALS_STORAGE_KEY = 'first_time_credentials';
  private _USER_CONFIRMED_STORAGE_KEY = 'user_confirmed';
  private sessionToken: SessionToken = new SessionToken();
  private wantToWork = false;
  private wantToHire = false;

  user: User = undefined;
  professions: Profession[] = undefined;
  locations: Location[] = undefined;

  constructor(  @Inject(LOCAL_STORAGE) private localStorage: StorageService,
                @Inject(SESSION_STORAGE) private sessionStorage, httpService: HttpService) {
    this.httpService = httpService;
    /* if (!environment.production) {
      import('./http.service.dev').then(module => {
        this.httpService = new module.HttpService();
      });
    } */
  }

  public getUser(): Observable<User> {

    if (this.user !== undefined) { return of(this.user); }

    if (this.localStorage.has(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY)) {

      const user = this.localStorage.get(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY);
      return of(user);
    } else if (this.sessionStorage.has(this._FB_STORAGE_KEY)) {

      this.sessionStorage.remove(this._FB_STORAGE_KEY);
      return of(this.parseUserFromDocumentCookie());
    } else if (this.sessionStorage.has(this._TOKEN_STORAGE_KEY)) {

      // Si el token est?? en sessionStorage sacarlo de ah??
      this.sessionToken = this.sessionStorage.get(this._TOKEN_STORAGE_KEY);
      if (!this.sessionToken.jwtAuth) { return of(this.parseUserFromDocumentCookie()); }
      return of(this.setUserFromToken(this.sessionToken.token));
    } else if (this.localStorage.has(this._TOKEN_STORAGE_KEY)) {

      // Sino buscar en localstorage
      this.sessionToken = this.localStorage.get(this._TOKEN_STORAGE_KEY);
      if (!this.sessionToken.jwtAuth) { return of(this.parseUserFromDocumentCookie()); }
      return of(this.setUserFromToken(this.sessionToken.token));
    } else {

      // Sino entonces limpiar todos los storages.
      return this.logout();
    }
  }

  public setUser(user: User, updateBackEnd?: boolean): Observable<User> {
    this.user = user;
    if (updateBackEnd != null && updateBackEnd) {
      return this.httpService.setUser(user).pipe(
        switchMap( us => {
          const fromT = us as User;
          this.user = new User(fromT.id, fromT.username, undefined, fromT.name, fromT.surname,
                                fromT.imageUrl, fromT.roles, fromT.employee, fromT.employer, fromT.email);
          return of(this.user);
        }));
    } else { return of(this.user); }
  }

  public registerUser(user: User): Observable<User> {

    this.user = user;
    return this.httpService.registerUser(user).pipe(
      switchMap( us => {
        this.saveFirstTimeCredentials({username: this.user.username, password: this.user.password});
        return of(this.user);
      }));
  }

  public login(email: string, passwd: string): Observable<User> {

    return this.httpService.login(email, passwd).pipe(
      switchMap( token => {

        if (this.localStorage.has(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY) &&
            this.localStorage.has(this._USER_CONFIRMED_STORAGE_KEY)) {
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
  public logout(): Observable<User> {

    this.clearSessionToken();
    document.cookie = 'loged_in_token=;expires=' + new Date('Thu, 01 Jan 1970 00:00:01 GMT') + ';secure;samesite;path=/';
    this.localStorage.remove(this._REMEMBER_ME_STORAGE_KEY);

    return this.httpService.logout().pipe(
      mergeMap(b => {
        this.user = new User();
        return of(this.user);
      }),
      catchError((e: any) => {
        this.user = new User();
        return of(this.user);
      })
    );
  }

  public setUserFromJWToken(token): User {
    this.sessionToken.jwtAuth = true;
    this.sessionToken.token = token;
    this.saveToken(this.sessionToken);
    return this.setUserFromToken(token);
  }

  public clearSessionToken() {
    this.sessionStorage.remove(this._TOKEN_STORAGE_KEY);
    this.localStorage.remove(this._TOKEN_STORAGE_KEY);
    this.sessionToken = new SessionToken();
  }

  public saveRememberMe(rememberme) {
    this.localStorage.set(this._REMEMBER_ME_STORAGE_KEY, rememberme);
  }

  public getSessionToken() {
    return this.sessionToken;
  }

  public saveFirstTimeCredentials(credentials: any) {
    this.localStorage.set(this._FIRST_TIME_CREDENTIALS_STORAGE_KEY, credentials);
    this.localStorage.set(this._REMEMBER_ME_STORAGE_KEY, true);
  }

  public checkOtherWindowLogin(): User {

    if (this.localStorage.has(this._TOKEN_STORAGE_KEY)) {
      this.sessionToken = this.localStorage.get(this._TOKEN_STORAGE_KEY);
      return this.setUserFromToken(this.sessionToken.token);
    }
    return new User();
  }

  public getAllProfessions(): Observable<Array<Profession>> {

    if (this.professions !== undefined) { return of(this.professions); }

    return this.httpService.getProfessions();
  }

  public setAllProfessions(professions: Array<Profession>): Array<Profession> {
    this.professions = professions;
    return this.professions;
  }

  public getAllLocations(): Observable<Array<Location>> {

    if (this.locations !== undefined) { return of(this.locations); }

    return this.httpService.getLocations();
  }

  public setAllLocations(locations: Array<Location>): Array<Location> {
    this.locations = locations;
    return this.locations;
  }

  public getEmployee(userId?: number): Observable<Employee> {

    if (userId == null && this.user.employee != null) { return of(this.user.employee); }

    const id = userId != null ? userId : this.user.id;
    return this.httpService.getEmployee(id).pipe(
      mergeMap(employee => {

        if (employee) {
          const emp =  employee as Employee;
          console.log(emp);
          this.user.employee = new Employee(emp.rate, emp.resume, emp.experiences, emp.locations, emp.id);
          console.log(this.user);
          return of(this.user.employee);
        } else {
          this.user.employee = new Employee(0, '', [], []);
          return of(this.user.employee);
        }
      }),
      catchError((e: any) => {
        this.user.employee = new Employee(0, '', [], []);
        return of(this.user.employee);
      })

    );
  }

  public setEmployee(employee: Employee): Employee {
    this.user.employee = employee;
    return this.user.employee;
  }

  public getEmployer(userId?: number): Observable<Employer> {

    if (userId == null && this.user.employer != null) { return of(this.user.employer); }
    const id = userId != null ? userId : this.user.id;

    return this.httpService.getEmployer(id).pipe(
      mergeMap(employer => {

        if (employer) {
          const emp =  employer as Employer;
          this.user.employer = new Employer(emp.rate, emp.projects, emp.id);
          return of(this.user.employer);
        } else {
          this.user.employer = new Employer(0, []);
          return of(this.user.employer);
        }
      }),
      catchError((e: any) => {
        this.user.employer = new Employer(0, []);
        return of(this.user.employer);
      })
    );
  }

  public setEmployer(employer: Employer): Employer {
    this.user.employer = employer;
    return this.user.employer;
  }

  public setWantToWork(value) {
    this.wantToWork = value;
  }

  public getWantToWork(): boolean {
    return this.wantToWork;
  }

  public setWantToHire(value) {
    this.wantToHire = value;
  }

  public getWantToHire(): boolean {
    return this.wantToHire;
  }


  /**************************** Private Methods ******************************/

  private saveToken(sessionToken: SessionToken) {
    const storage = this.localStorage.get(this._REMEMBER_ME_STORAGE_KEY) === true ? this.localStorage : this.sessionStorage;
    storage.set(this._TOKEN_STORAGE_KEY, sessionToken);
  }

  private saveFacebookSessionTempKey() {
    this.clearSessionToken();
    this.sessionStorage.set(this._FB_STORAGE_KEY, true);
  }

  private setUserFromToken(token: string): User {
    const helper = new JwtHelperService();
    const fromT = helper.decodeToken(token) as User;
    this.user = new User(fromT.id, fromT.username, undefined, fromT.name, fromT.surname,
                          fromT.imageUrl, fromT.roles, undefined, undefined, fromT.email);
    return this.user;
  }

  private parseUserFromDocumentCookie(): User {
    const cookieArray =  document.cookie.split(';');
    if (cookieArray.length > 0 && cookieArray[0] !== '') {
      const filteredCookie: any = cookieArray.map(elem => {
        const splited = elem.split('=');
        splited[0] = splited[0].trim();
        if (splited[0].indexOf('loged_in_token') === 0) {
          document.cookie = splited[0] + '=;expires=' + new Date('Thu, 01 Jan 1970 00:00:01 GMT') + ';secure;samesite;path=/';
          splited[1].trim();
          return splited;
        }
        return null;
      }).filter(elem => elem != null && elem[0] === 'loged_in_token');
      if (filteredCookie.length > 0 && filteredCookie[0][1] !== '__' && filteredCookie[0][1] !== '') {
        this.sessionToken.jwtAuth = false;
        this.sessionToken.token = filteredCookie[0][1];
        this.saveToken(this.sessionToken);
        return this.setUserFromToken(filteredCookie[0][1]);
      }
    }
    return new User();
  }
}
