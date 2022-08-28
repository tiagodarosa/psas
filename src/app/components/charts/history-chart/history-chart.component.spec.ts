import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChartComponent } from './history-chart.component';

describe('HistoryChartComponent', () => {
  let component: HistoryChartComponent;
  let fixture: ComponentFixture<HistoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
