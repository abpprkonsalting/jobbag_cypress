import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2aComponent } from './step2a.component';

describe('Step2aComponent', () => {
  let component: Step2aComponent;
  let fixture: ComponentFixture<Step2aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
