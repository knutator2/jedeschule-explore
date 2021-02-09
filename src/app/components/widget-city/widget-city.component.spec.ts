import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCityComponent } from './widget-city.component';

describe('WidgetCityComponent', () => {
  let component: WidgetCityComponent;
  let fixture: ComponentFixture<WidgetCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
