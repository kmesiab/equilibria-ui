import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactFeedListComponent } from './fact-feed-list.component';

describe('FactFeedListComponent', () => {
  let component: FactFeedListComponent;
  let fixture: ComponentFixture<FactFeedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactFeedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactFeedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
