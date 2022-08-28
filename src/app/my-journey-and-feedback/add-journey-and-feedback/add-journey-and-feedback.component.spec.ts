import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJourneyAndFeedbackComponent } from './add-journey-and-feedback.component';

describe('AddJourneyAndFeedbackComponent', () => {
  let component: AddJourneyAndFeedbackComponent;
  let fixture: ComponentFixture<AddJourneyAndFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJourneyAndFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJourneyAndFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
