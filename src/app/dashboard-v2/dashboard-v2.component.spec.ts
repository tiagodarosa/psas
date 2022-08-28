import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardV2Component } from './dashboard-v2.component';

describe('DashboardComponent', () => {
  let component: DashboardV2Component;
  let fixture: ComponentFixture<DashboardV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
