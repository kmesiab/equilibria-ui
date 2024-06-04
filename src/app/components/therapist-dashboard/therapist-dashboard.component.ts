import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { FactFeedListComponent } from '../fact-feed-list/fact-feed-list.component';
import { CurrentUserService } from '../../services/current-user-service.service';
import { Router } from '@angular/router';
import { TherapistSidebarComponent } from '../therapist-sidebar/therapist-sidebar.component';

@Component({
  selector: 'app-therapist-dashboard',
  standalone: true,
  imports: [
    TherapistSidebarComponent,
    TopBarComponent,
    FactFeedListComponent,
  ],
  templateUrl: './therapist-dashboard.component.html',
  styleUrls: ['./therapist-dashboard.component.scss'] // Ensure 'styleUrls' is correctly spelled
})
export class TherapistDashboardComponent {

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    if (!this.currentUserService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.currentUserService.isTherapist()) {
      this.router.navigate(['/profile']);
      return;
    }

  }
 }
