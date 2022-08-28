import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonOfResultsComponent } from './comparison-of-results.component';

describe('ComparisonOfResultsComponent', () => {
  let component: ComparisonOfResultsComponent;
  let fixture: ComponentFixture<ComparisonOfResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonOfResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonOfResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
