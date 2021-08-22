import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2bComponent } from './step2b.component';

describe('Step2bComponent', () => {
  let component: Step2bComponent;
  let fixture: ComponentFixture<Step2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
