import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private currentUserService: CurrentUserService, private router: Router) { }

  signOut(): void {
    this.currentUserService.clearJwt();
    this.router.navigate(['/login']);
    return;
  }
}
