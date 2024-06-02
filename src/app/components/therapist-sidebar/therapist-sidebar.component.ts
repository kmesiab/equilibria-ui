import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-therapist-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './therapist-sidebar.component.html',
  styleUrl: './therapist-sidebar.component.scss'
})
export class TherapistSidebarComponent {

  constructor(private currentUserService: CurrentUserService, private router: Router) { }

  signOut(): void {
    this.currentUserService.clearJwt();
    this.router.navigate(['/login']);
    return;
  }
}
