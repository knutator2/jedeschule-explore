import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSchoolTypeComponent } from './widget-school-type.component';

describe('WidgetSchoolTypeComponent', () => {
  let component: WidgetSchoolTypeComponent;
  let fixture: ComponentFixture<WidgetSchoolTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSchoolTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSchoolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
