import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RoutingStep } from '../../infrastructure/model/routing-steps.model';

@Component({
  selector: 'add-wizard',
  templateUrl: './add-wizard.component.html',
  styleUrls: ['./add-wizard.component.less']
})
export class AddWizardComponent implements OnInit{

  public _steps : string[];
  public selectedStep: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._steps = this.route.snapshot.routeConfig.children.map(child => { return child.path });
    let step = this._steps[0];
    this.router.navigate([step], { relativeTo: this.route });
  }

  selectionChanged(event: any) {
    this.selectedStep = event.selectedIndex;
    this.router.navigate([this._steps[this.selectedStep]],{relativeTo:this.route});
  }
}
