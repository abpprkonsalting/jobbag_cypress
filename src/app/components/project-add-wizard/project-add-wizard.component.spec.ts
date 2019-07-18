import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddWizardComponent } from './project-add-wizard.component';

describe('ProjectAddWizardComponent', () => {
  let component: ProjectAddWizardComponent;
  let fixture: ComponentFixture<ProjectAddWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
