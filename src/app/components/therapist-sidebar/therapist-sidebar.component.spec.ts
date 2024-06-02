import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistSidebarComponent } from './therapist-sidebar.component';

describe('TherapistSidebarComponent', () => {
  let component: TherapistSidebarComponent;
  let fixture: ComponentFixture<TherapistSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapistSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TherapistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
