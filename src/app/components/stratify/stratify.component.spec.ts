import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratifyComponent } from './stratify.component';

describe('StratifyComponent', () => {
  let component: StratifyComponent;
  let fixture: ComponentFixture<StratifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StratifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StratifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
