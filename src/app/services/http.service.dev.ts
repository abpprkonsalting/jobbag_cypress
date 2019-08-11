import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constants } from '../app-constants';

import { User } from '../infrastructure/model/user.model';
import { Profession } from '../infrastructure/model/profession.model';
import { Location } from '../infrastructure/model/location.model';
import { Language } from '../infrastructure/dtos/language.dto';
import { locations, professions } from '../app-constants';




@Injectable()
export class HttpService {

  constructor() {}


  public login(username: string, password: string) {

    return of("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1NjU1MjczMDksImV4cCI6MTU2NTUzMDkwOSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFybWJwMTk3MkBnbWFpbC5jb20iLCJlbWFpbCI6ImFybWJwMTk3MkBnbWFpbC5jb20iLCJuYW1lIjoiQXJtYW5kbyIsInN1cm5hbWUiOiJCYVx1MDBmMW9zIFBhc2N1YWwiLCJpbWFnZVVybCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwic2Vzc2lvbklkIjpudWxsfQ.iIQYjjFqVDnCVbn-hb0HNuk-ZVaMXo9Qc9-7FIertrdd5ugrCD2mfwlX2LVR--Nmhr-eRbHnZOcJGWYGNqR4VfgVPCoQALxvQmxlznnftiVjxumkdz_PegZ6EqD10sm9QuCIAtmez86V70x8XPUhE4tvrN0iTdZJkmmXxRBLE7Ts1opwS0-5wuuysgA6qjgbTiqxSrPknHnymR9UCorvf3fKqCI6isaag7-6LPCeDdQL2JVvzDHEHVbygd2fxq5Bv0_rMfgL_z6LTMo7DHrbXlJGaNadg0vop8mdatyntNQfT7fUNYrmFEBKti_LTk4iGg43H5Cd2duzmBYhqw5BEcSruNwrNO9gtin3mwY5wWunftU5Mq3SQQ1n2nCArvysRd2IzIpO9bCag3qefK_5ph0RmkiE-Nd3x9GxZa_GZB_9eqmtGA38S62WpHs9LG8COInhRTP1Ci3hPYeVR7G97GAR4mvvcVpvCocLuygLjhFyU6vVsIzY8Rm2g5IINbeVTU-OV1Xpx4nq1tGnQTA3mbAS2nQ7JrO8h0J03ING9rUzQdErgqTEsepwrWTsMvT1LBxEr1Z197W_gZrtEbLFTXaLGaWumCoCkK8SxLiRHcjLHXNzZrSAsU68_0t4emFhnfSVNOv6zzFKM9hTUfPrmUdD8gKwxokTxJNpGdzvQgg");
  }

  public registerUser(user: User) {

    return null;
  }

  public loginFacebook() {
    window.location.href= constants.baseUrl + "connect/facebook";
  }

  public getLanguages(): Observable<Array<Language>> {

    let ret = [];
    return of(ret );
  }

  public getProfessions(): Observable<Array<Profession>> {

    return of(professions);
  }

  public getLocations(): Observable<Array<Location>> {

    return of(locations);
  }

}
