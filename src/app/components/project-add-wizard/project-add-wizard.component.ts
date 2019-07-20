import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RoutingStep } from '../../infrastructure/model/routing-steps.model';

@Component({
  selector: 'app-project-add-wizard',
  templateUrl: './project-add-wizard.component.html',
  styleUrls: ['./project-add-wizard.component.less']
})
export class ProjectAddWizardComponent implements OnInit{

  public _steps : RoutingStep[] = [{template: '/project-add-wizard/step1', title: 'step1'},{template: '/project-add-wizard/step2', title: 'step2'},{template: '/project-add-wizard/step3', title: 'step3'}];
  public selectedStep: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {

    let step = this._steps[0];
    this.router.navigateByUrl(step.template);
  }

  selectionChanged(event: any) {
    this.selectedStep = event.selectedIndex;
    this.router.navigateByUrl(this._steps[this.selectedStep].template);
  }
}
