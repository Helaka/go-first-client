import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryShelfShareComponent } from './primary-shelf-share.component';

describe('PrimaryShelfShareComponent', () => {
  let component: PrimaryShelfShareComponent;
  let fixture: ComponentFixture<PrimaryShelfShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryShelfShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryShelfShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
