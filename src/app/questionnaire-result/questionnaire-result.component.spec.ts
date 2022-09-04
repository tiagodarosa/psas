import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireResultComponent } from './questionnaire-result.component';

describe('QuestionnaireResultComponent', () => {
  let component: QuestionnaireResultComponent;
  let fixture: ComponentFixture<QuestionnaireResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
