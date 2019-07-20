import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../infrastructure/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable,of} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class WebStorageService {

  private _TOKEN_STORAGE_KEY = 'jwt_token';
  user: User = undefined;
  private _sessionToken: string = undefined;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private cookieservice: CookieService) {
  }

  public getUser(): Observable<User> {

    if (this.user != undefined) return of(this.user);
    if (this.storage.has(this._TOKEN_STORAGE_KEY)) {
      return of(this.setUserFromToken(this.storage.get(this._TOKEN_STORAGE_KEY)));
    }
    return of(this.parseUserFromDocumentCookie());
  }

  public setUserFromToken(token: string): User {

    this.setSessionToken(token);
    const helper = new JwtHelperService();
    this.user = this.processUserForView(<User> helper.decodeToken(token));
    return this.user;
  }

  public getSessionToken() {
    return this._sessionToken;
  }

  public clearSessionToken() {
    this._sessionToken = undefined;
    this.storage.remove(this._TOKEN_STORAGE_KEY);
  }

  public saveAppState(location: string){
    // Aquí debo salvar más que location para local storage. Si hay algún proyecto que ese esté procesando o cualquier cosa parecida también debo salvarla.
    //this.storage.set(this.CURRENT_LOCATION_STORAGE_KEY,location);
  }

  public restoreAppState(): string{
    //let tmp = this.storage.get(this.CURRENT_LOCATION_STORAGE_KEY);
    //if (tmp != undefined) this.storage.remove(this.CURRENT_LOCATION_STORAGE_KEY);
    return '';
  }

  /**************************** Private Methods ******************************/

  private setSessionToken(token: any) {
    this.storage.set(this._TOKEN_STORAGE_KEY,token);
    this._sessionToken = token;
  }

  private parseUserFromDocumentCookie(): User {
    const cookieArray =  document.cookie.split(";");
    if (cookieArray.length > 0 && cookieArray[0] != ""){
      let filteredCookie: any = cookieArray.map(elem => {
        let splited = elem.split("=");
        splited[0] = splited[0].trim();
        if(splited[0].indexOf('loged_in_token') == 0) {
          document.cookie=splited[0] + "=;expires="+new Date('Thu, 01 Jan 1970 00:00:01 GMT')+ ";secure;samesite;path=/";
          this.cookieservice.delete('loged_in_token',"/","jobbag.ca");
          splited[1].trim();
          return splited;
        }
        return null;
      }).filter(elem => elem != null && elem[0] == "loged_in_token");
      if (filteredCookie.length > 0 && filteredCookie[0][1] != '__' && filteredCookie[0][1] != '') {
        const helper = new JwtHelperService();
        this.user = this.processUserForView(<User> helper.decodeToken(filteredCookie[0][1]));
        return this.user;
      }
    }
    return new User();
  }

  private processUserForView(user: User): User{

    if (user.name == null || user.name == undefined) {
      user.name = "Invitado"; // Esto hay que internacionalizarlo.
      user.surname = "";
    }
    return user;
  }
}
