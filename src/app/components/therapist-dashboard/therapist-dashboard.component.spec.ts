import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistDashboardComponent } from './therapist-dashboard.component';

describe('TherapistDashboardComponent', () => {
  let component: TherapistDashboardComponent;
  let fixture: ComponentFixture<TherapistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TherapistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
