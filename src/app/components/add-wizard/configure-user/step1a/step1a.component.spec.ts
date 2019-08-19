import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1aComponent } from './step1a.component';

describe('Step1aComponent', () => {
  let component: Step1aComponent;
  let fixture: ComponentFixture<Step1aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step1aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
