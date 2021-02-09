import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetZipComponent } from './widget-zip.component';

describe('WidgetZipComponent', () => {
  let component: WidgetZipComponent;
  let fixture: ComponentFixture<WidgetZipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetZipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
