import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NineBoxChartComponent } from './nine-box-chart.component';

describe('NineBoxChartComponent', () => {
  let component: NineBoxChartComponent;
  let fixture: ComponentFixture<NineBoxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NineBoxChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NineBoxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
