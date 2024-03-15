import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEmotionGraphComponent } from './daily-emotion-graph.component';

describe('DailyEmotionGraphComponent', () => {
  let component: DailyEmotionGraphComponent;
  let fixture: ComponentFixture<DailyEmotionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyEmotionGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyEmotionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
