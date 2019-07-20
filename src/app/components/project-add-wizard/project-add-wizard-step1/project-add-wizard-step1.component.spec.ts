import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddWizardStep1Component } from './project-add-wizard-step1.component';

describe('ProjectAddWizardStep1Component', () => {
  let component: ProjectAddWizardStep1Component;
  let fixture: ComponentFixture<ProjectAddWizardStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddWizardStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddWizardStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
