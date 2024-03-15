import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaderGraphComponent } from './vader-graph.component';

describe('VaderGraphComponent', () => {
  let component: VaderGraphComponent;
  let fixture: ComponentFixture<VaderGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaderGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaderGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
