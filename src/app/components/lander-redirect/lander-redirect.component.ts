import { Component } from '@angular/core';

@Component({
  selector: 'app-lander-redirect',
  standalone: true,
  imports: [],
  templateUrl: './lander-redirect.component.html',
  styleUrl: './lander-redirect.component.scss'
})
export class LanderRedirectComponent {
  ngOnInit() {
    window.location.href = 'https://my-eq.carrd.co/';
  }

}
