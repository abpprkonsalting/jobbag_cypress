import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { constants } from '../app-constants';

import { User } from '../infrastructure/model/user.model';



import { Profession } from '../infrastructure/model/profession.model';
import { Location } from '../infrastructure/model/location.model';
import { Language } from '../infrastructure/dtos/language.dto';
import { Employee } from '../infrastructure/model/employee.model';
import { Employer } from '../infrastructure/model/employer.model';




@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}


  public login(username: string, password: string) {

    return this.http.post<string>( constants.apiUrl + 'login',
                                    new HttpParams({
                                      fromObject: {
                                        grant_type: 'password',
                                        _username: username,
                                        _password: password
                                      }
                                    }),
                                    {
                                      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
                                    })
                                    .pipe(
                                      map((body: any) => body.token as string),
                                      catchError((e: any) => throwError(e))
                                    );
  }

  public registerUser(user: User) {

    return this.http.post<string>( constants.apiUrl + 'user/register',
                                  {username: user.username, password: user.password},
                                  {headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
                                  .pipe(
                                    map((body: any) => body),
                                    catchError((e: any) => throwError(e)));
  }

  public loginFacebook() {
    window.location.href = constants.apiUrl + 'connect/facebook';
  }

  public logout() {

    return this.http.post<string>( constants.apiUrl + 'logout', {}, {})
                                  .pipe(
                                    map((body: any) => body),
                                    catchError((e: any) => throwError(e)));
  }

  public getLanguages(): Observable<Array<Language>> {

    return this.http.get(constants.apiUrl + 'languages/', {}).pipe(
      map((e: any) =>  e as Array<Language>),
      catchError((e: any) => throwError(e))
    );
  }

  public getProfessions(): Observable<Array<Profession>> {

    return this.http.get(constants.apiUrl + 'professions/', {}).pipe(
      map((e: any) =>  e as Array<Profession>),
      catchError((e: any) => throwError(e))
    );
  }

  public getLocations(): Observable<Array<Location>> {

    return this.http.get(constants.apiUrl + 'locations/', {}).pipe(
      map((e: any) =>  e as Array<Location>),
      catchError((e: any) => throwError(e))
    );
  }

  public getEmployee(userId): Observable<Employee> {

    return throwError('bla');
    /* return this.http.get(constants.apiUrl + 'employee/getbyuserId', {params: {userId: userId}}).pipe(
      map((e: any) =>  e as Employee),
      catchError((e: any) => throwError(e))
    ); */
  }

  public getEmployer(userId): Observable<Employer> {

    return throwError('bla');
    /* return this.http.get(constants.apiUrl + 'employer/getbyuserId', {params: {userId: userId}}).pipe(
      map((e: any) =>  e as Employer),
      catchError((e: any) => throwError(e))
    ); */
  }

  public setUser(user: User) {

    return this.http.post<string>(
      constants.baseUrl + 'user/update', user.getDto(), {headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
      .pipe(
        map((body: any) =>  body as User),
        catchError((e: any) => throwError(e))
      );
  }

  public clearUserImage(imgUrl): Observable<string> {

    return this.http.get(constants.apiUrl + 'user/clearUserImage/' + imgUrl).pipe(
      map((e: any) =>  e as string),
      catchError((e: any) => throwError(e))
    );
  }

}
