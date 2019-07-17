import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { WebStorageService } from './webstorage.service';

import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this._webStorageService.getSessionToken() != undefined) {
      const customReq = request.clone({
        headers: request.headers.set('Authorization', ' Bearer ' + this._webStorageService.getSessionToken())
      });
      return next.handle(customReq);
    }
    else return next.handle(request);
  }
  constructor (private _webStorageService : WebStorageService) {}
}
