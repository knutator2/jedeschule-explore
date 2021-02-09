import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLinelistComponent } from './widget-linelist.component';

describe('WidgetLinelistComponent', () => {
  let component: WidgetLinelistComponent;
  let fixture: ComponentFixture<WidgetLinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetLinelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
