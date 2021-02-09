import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetProviderComponent } from './widget-provider.component';

describe('WidgetProviderComponent', () => {
  let component: WidgetProviderComponent;
  let fixture: ComponentFixture<WidgetProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
