import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddWizardStep3Component } from './project-add-wizard-step3.component';

describe('ProjectAddWizardStep3Component', () => {
  let component: ProjectAddWizardStep3Component;
  let fixture: ComponentFixture<ProjectAddWizardStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddWizardStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddWizardStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
