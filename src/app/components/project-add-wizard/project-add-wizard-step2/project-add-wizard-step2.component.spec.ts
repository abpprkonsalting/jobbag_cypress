import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddWizardStep2Component } from './project-add-wizard-step2.component';

describe('ProjectAddWizardStep2Component', () => {
  let component: ProjectAddWizardStep2Component;
  let fixture: ComponentFixture<ProjectAddWizardStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddWizardStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddWizardStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
