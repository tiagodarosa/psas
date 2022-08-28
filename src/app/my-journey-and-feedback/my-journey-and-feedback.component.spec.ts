import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJourneyAndFeedbackComponent } from './my-journey-and-feedback.component';

describe('MyJourneyAndFeedbackComponent', () => {
  let component: MyJourneyAndFeedbackComponent;
  let fixture: ComponentFixture<MyJourneyAndFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJourneyAndFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJourneyAndFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
