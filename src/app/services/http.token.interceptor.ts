import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { WebStorageService } from './webstorage.service';
import { SessionToken } from '../infrastructure/model/sessionToken.model';
import { constants } from '../app-constants';

import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      let sessionToken: SessionToken = this._webStorageService.getSessionToken();
      if ((request.url.startsWith(constants.apiUrl) || request.url.startsWith("api")) &&  (sessionToken != undefined && sessionToken.jwtAuth)) {
        const customReq = request.clone({
        headers: request.headers.set('Authorization', ' Bearer ' + sessionToken.token)
      });
      return next.handle(customReq);
    }
    else return next.handle(request);
  }
  constructor (private _webStorageService : WebStorageService) {}
}
