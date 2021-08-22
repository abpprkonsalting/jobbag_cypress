import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { WebStorageService } from './webstorage.service';
import { SessionToken } from '../infrastructure/model/sessionToken.model';

import { Observable } from 'rxjs';

@Injectable()
export class HttpXdebugInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      let sessionToken: SessionToken = this._webStorageService.getSessionToken();
      if ( sessionToken != undefined && sessionToken.jwtAuth) {
        const customReq = request.clone({
        headers: request.headers.set('Authorization', ' Bearer ' + sessionToken.token)
      });
      return next.handle(customReq);
    }
    else return next.handle(request);
  }
  constructor (private _webStorageService : WebStorageService) {}
}

//Cookie: XDEBUG_SESSION=XDEBUG_ECLIPSE; PHPSESSID=mv40aviuklkcbttuitefvqf9je
