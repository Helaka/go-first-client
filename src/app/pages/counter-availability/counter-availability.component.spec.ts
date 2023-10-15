import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterAvailabilityComponent } from './counter-availability.component';

describe('CounterAvailabilityComponent', () => {
  let component: CounterAvailabilityComponent;
  let fixture: ComponentFixture<CounterAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
