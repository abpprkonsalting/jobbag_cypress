import { Injectable } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { Profession } from './infrastructure/model/profession.model';
import { Location } from './infrastructure/model/location.model';
import { Employee } from './infrastructure/model/employee.model';
import { Employer } from './infrastructure/model/employer.model';
import {User} from './infrastructure/model/user.model';

import {WebStorageService} from './services/webstorage.service';

@Injectable({
  providedIn: 'root',
})
export class RoutingResolversProfessionsService implements Resolve<Profession[]> {
  constructor(private webStorageService: WebStorageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Profession>> | Observable<never> {


    return this.webStorageService.getAllProfessions().pipe(
      take(1),
      mergeMap(professions => {
        if (professions){
          return of(this.webStorageService.setAllProfessions(professions));
        } else {
          return EMPTY;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoutingResolversLocationsService implements Resolve<Location[]> {
  constructor(private webStorageService: WebStorageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Location>> | Observable<never> {


    return this.webStorageService.getAllLocations().pipe(
      take(1),
      mergeMap(locations => {
        if (locations){
          return of(this.webStorageService.setAllLocations(locations));
        } else {
          return EMPTY;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoutingResolversEmployeeService implements Resolve<any> {
  constructor(private webStorageService: WebStorageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {


    return this.webStorageService.getEmployee().pipe(
      take(1),
      mergeMap(employee => {
        return of(employee);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoutingResolversEmployerService implements Resolve<any> {
  constructor(private webStorageService: WebStorageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {

    return this.webStorageService.getEmployer().pipe(
      take(1),
      mergeMap(employer => {
        return of(employer);
      })
    );
  }
}
