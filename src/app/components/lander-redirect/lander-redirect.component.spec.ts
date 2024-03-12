import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanderRedirectComponent } from './lander-redirect.component';

describe('LanderRedirectComponent', () => {
  let component: LanderRedirectComponent;
  let fixture: ComponentFixture<LanderRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanderRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanderRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
