import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolerPurityComponent } from './cooler-purity.component';

describe('CoolerPurityComponent', () => {
  let component: CoolerPurityComponent;
  let fixture: ComponentFixture<CoolerPurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolerPurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolerPurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
