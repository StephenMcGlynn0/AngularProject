import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringStats2Component } from './scoring-stats2.component';

describe('ScoringStats2Component', () => {
  let component: ScoringStats2Component;
  let fixture: ComponentFixture<ScoringStats2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoringStats2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoringStats2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
