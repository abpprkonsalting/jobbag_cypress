import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { constants } from '../app-constants';

import { User } from '../infrastructure/model/user.model';



import { Language } from '../infrastructure/dtos/language.dto';





@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}


  public login(username: string, password: string) {

    return this.http.post<string>( constants.baseUrl + 'login',
                                    new HttpParams({
                                      fromObject: {
                                        grant_type: 'password',
                                        _username: username,
                                        _password: password
                                      }
                                    }),
                                    {
                                      'headers': new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
                                    })
                                    .pipe(
                                      map((body:any)=> <string>body.token),
                                      catchError((e:any)=> throwError(e))
                                    );
  }

  public registerUser(user: User) {

    return this.http.post<string>( constants.baseUrl + 'user/register',{"username":user.username,"password":user.password},{'headers': new HttpHeaders({ 'Content-Type': 'application/json' })})
                                  .pipe(
                                    map((body:any)=> body),
                                    catchError((e:any)=> throwError(e)));
  }

  public loginFacebook() {
    window.location.href= constants.baseUrl + "connect/facebook";
  }

  public getLanguages(): Observable<Array<Language>> {

    return this.http.get(constants.apiUrl + 'languages/',{}).pipe(
      map((e:any)=> <Array<Language>>e),
      catchError((e:any)=> throwError(e))
    );
  }

}
