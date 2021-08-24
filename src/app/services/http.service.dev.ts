import { Injectable } from '@angular/core';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { constants } from '../app-constants';

import { User } from '../infrastructure/model/user.model';
import { Profession } from '../infrastructure/model/profession.model';
import { Location } from '../infrastructure/model/location.model';
import { Employee } from '../infrastructure/model/employee.model';
import { Employer } from '../infrastructure/model/employer.model';
import { locations, professions, employee, employer } from '../app-constants';




@Injectable()
export class HttpService {

  constructor() {}


  public login(username: string, password: string) {

    return of( 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE1NjU1OTMxODAsImV4cCI6MTU2NTU5Njc4MCwicm9sZXMiOlsiUk9MR' +
               'V9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFybWJwMTk3MkBnbWFpbC5jb20iLCJpZCI6NCwiZW1haWwiOiJhcm1icDE5NzJAZ21haWwuY29' +
               'tIiwibmFtZSI6IkFybWFuZG8iLCJzdXJuYW1lIjoiQmFcdTAwZjFvcyBQYXNjdWFsIiwiaW1hZ2VVcmwiOiJodHRwOlwvXC9leGFtcGxlLmNvbSJ9.PUwS' +
               'FSb2VA6Hl-sJduhIPcz5s1yMiy7uzIU7Gk5qvmQNFB9Iti-pEt1Z7sVB7oYn_oTfCiIikJcRLUVtEqDKrd0pxyDqga0xYzUoCtmMUoSQ2S1NUxQELwS8hk' +
               'S102Tp2c4qo4GD-EA2UE2ytnQgsqexuHNdJeoHno4o9n39hCE2d4L9PZYqpinBHkmIetqz7fqi9UmwsNqoLrUcLwIO9-qYBpgowvkIEsEuKg-OgCqz4Jlr' +
               'oKJPkediicA3eNE_PLvlY07b7QOQ3g9we5yKLjT1glXnX-32CPcER5iGsb-ExPEe78uTbHlkppDsAY0-As5FnMPa2lv8dl8qIYdvnn1VJv9Ixl4lr65Sw7' +
               'thaRx3klQJipSztRSBKzaQPmlr6HpdUlUUJObNs1tpXOt-kXX7NjuWzfM4WwZ67dSgPQUr1kJbQyuLVJaWEiRskREmUyWK1R585nWHatR-vyd_r1eskwdx' +
               '6cob7wwt3DfeQR4EkdhyXgsKNZIXIopFzkPuqjHtrb0_d4JBAqScQ5qJySLXAfnsHynEQtyEV9xuMDKSJ9Z07iKnzEwmV1GL58p5PwxKseSERaTBNvZ3Gn' +
               '5HjW8nzv0Z2lAM1jW2pvwEtBNi3gBSN4m4mADncKt2426hhZZuOJaGy48fIuDmcnh_VjbnJQAEyaJIHVUK2DX7Le0');
  }

  public registerUser(user: User) {

    return null;
  }

  public setUser(user: User): Observable<User> {
    console.log(user.getDto());
    return of(user);
  }

  public loginFacebook() {
    window.location.href = constants.baseUrl + 'api/connect/facebook';
  }

  public getEmployee(id): Observable<Employee> {

    return throwError('bla');
    // return of(employee);
  }

  public getEmployer(id): Observable<Employer> {

    return throwError('bla');
    // return of(employer);
  }

  public getProfessions(): Observable<Array<Profession>> {

    return of(professions);
  }

  public getLocations(): Observable<Array<Location>> {

    return of(locations);
  }

  public logout() {

    return of('');
  }

}
