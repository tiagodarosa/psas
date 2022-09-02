import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJourneyAndFeedbackComponent } from './details-journey-and-feedback.component';

describe('DetailsJourneyAndFeedbackComponent', () => {
  let component: DetailsJourneyAndFeedbackComponent;
  let fixture: ComponentFixture<DetailsJourneyAndFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsJourneyAndFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsJourneyAndFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
