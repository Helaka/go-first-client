import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallBrandingComponent } from './wall-branding.component';

describe('WallBrandingComponent', () => {
  let component: WallBrandingComponent;
  let fixture: ComponentFixture<WallBrandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallBrandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
