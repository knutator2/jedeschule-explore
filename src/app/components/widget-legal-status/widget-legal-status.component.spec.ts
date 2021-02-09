import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLegalStatusComponent } from './widget-legal-status.component';

describe('WidgetLegalStatusComponent', () => {
  let component: WidgetLegalStatusComponent;
  let fixture: ComponentFixture<WidgetLegalStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetLegalStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLegalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
