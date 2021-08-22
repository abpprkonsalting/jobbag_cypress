import { Component, OnInit } from '@angular/core';

import {WebStorageService} from '../../services/webstorage.service';
import { User } from '../../infrastructure/model/user.model';
import { Experience } from '../../infrastructure/model/experience.model';
import { Router,ActivatedRoute } from '@angular/router';

import {constants} from '../../app-constants';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  sliderUrl: string;
  user: User;

  constructor(private webstorageService: WebStorageService, private route: ActivatedRoute,private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.sliderUrl = constants.assetsUrl + 'tech.jpg';

    this.webstorageService.getUser().subscribe(
      next => {
        this.user = next;
        console.log(this.user);
      },
      error => {
        console.log(error.message);
        this.user = new User();
      }
    );
    this.route.data.subscribe(
        data => data,
        error => {
          console.log(error);
        });

  }

  wantToWork() {
    if (this.user.id == 0) {
      this.webstorageService.setWantToWork(true);
      this.router.navigate(['sign-in']);
    }
    else if (this.user.employee == undefined || this.user.employee.id == 0) {
      // Ir a un wizard de crear employee aquí
    }

  }

  wantToHire() {
    //console.log(this.user.employer.id);
  }

}
