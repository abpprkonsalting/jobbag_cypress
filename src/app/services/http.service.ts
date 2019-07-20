import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { User } from '../infrastructure/model/user.model';
import { CookieService } from 'ngx-cookie-service';
import {WebStorageService} from './webstorage.service';
import { Language } from '../infrastructure/dtos/language.dto';
import { constants } from '../app-constants.module';


@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private _cookieService: CookieService, private webStorageService: WebStorageService) {}


  login(username: string, password: string) {

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
                                    )
  }

  loginFacebook() {
    this.webStorageService.clearSessionToken();
    window.location.href= constants.baseUrl + "connect/facebook";
  }

  public getLanguages(): Observable<Array<Language>> {

    return this.http.get(constants.apiUrl + 'languages/',{}).pipe(
      map((e:any)=> <Array<Language>>e),
      catchError((e:any)=> throwError(e))
      );
  }

}