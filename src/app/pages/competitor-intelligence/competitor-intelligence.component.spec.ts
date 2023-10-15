import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorIntelligenceComponent } from './competitor-intelligence.component';

describe('CompetitorIntelligenceComponent', () => {
  let component: CompetitorIntelligenceComponent;
  let fixture: ComponentFixture<CompetitorIntelligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorIntelligenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorIntelligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
