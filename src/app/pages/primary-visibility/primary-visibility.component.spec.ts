import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryVisibilityComponent } from './primary-visibility.component';

describe('PrimaryVisibilityComponent', () => {
  let component: PrimaryVisibilityComponent;
  let fixture: ComponentFixture<PrimaryVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryVisibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
