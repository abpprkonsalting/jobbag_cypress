import { Component, OnInit} from '@angular/core';
import { Router,Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-wizard',
  templateUrl: './add-wizard.component.html',
  styleUrls: ['./add-wizard.component.less']
})
export class AddWizardComponent implements OnInit{

  public steps : Route[];
  public selectedStep: number = 0;
  public wizardTitle: string;
  public initialShowNav: boolean = true;
  public linear: boolean = true;
  public data: any;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.steps = this.route.snapshot.routeConfig.children;

    this.route.data.subscribe( data => {
      this.wizardTitle = data.header;
      this.initialShowNav = data.showNav != undefined ? data.showNav : true;;
      this.linear = data.linear != undefined ? data.linear : false;
    });
    let step = this.steps[0];
    this.router.navigate([step.path], { relativeTo: this.route });
  }

  selectionChanged(event: any) {
    this.selectedStep = event.selectedIndex;
    this.steps[this.selectedStep].data = {...this.steps[this.selectedStep].data, ...this.data};
    this.router.navigate([this.steps[this.selectedStep].path],{relativeTo:this.route});
  }

  dataChanged($event) {
    this.data = {...$event};
  }
}
