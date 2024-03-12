import {CommonModule} from "@angular/common";
import {HttpResponse} from "@angular/common/http";
import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {CurrentUserService} from "../../services/current-user-service.service";
import {UserService} from "../../services/user-service.service";
import {AccountStatus} from "../../types/account-status";
import {User} from "../../types/user";
import {Chart} from 'chart.js/auto';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {

  now = new Date();

  chart: any = [];

  user: User;
  errorMessage: string = "";
  updateMessage: string = "";
  updatingUserInfo = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private currentUserService: CurrentUserService
  ) {
    this.user = this.currentUserService.getUser()
  }

  ngOnInit(): void {

    this.errorMessage = "";
    this.updateMessage = "";

    if (!this.currentUserService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.user !== null && this.user.accountStatusId !== AccountStatus.ACTIVE) {
      this.router.navigate(['/login']);
      return;
    }

    this.renderChart();
  }

  renderChart(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Happiness', 'Sadness',  'Anger', 'Anxiety', 'Fear'],
        datasets: [{
          label: 'Your Emotion Wave',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.4
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  closeWarning(): void {
    this.errorMessage = "";
    this.updateMessage = "";
  }

  signOut(): void {
    this.currentUserService.clearJwt();
    this.router.navigate(['/login']);
    return;
  }

  updateProfile(): void {

    this.closeWarning();
    this.updatingUserInfo = true
    this.user.password = null;
    this.userService.update(this.user).subscribe(
      (response: HttpResponse<any>) => this.handleUpdateResponse(response),
      (error: any) => this.showErrorMessage(error)
    )
  }

  handleUpdateResponse(response: HttpResponse<any>): void {

    this.updatingUserInfo = false;

    if (response.status === 200) {
      this.currentUserService.setJwt(response.body.data.token)
      this.updateMessage = 'Your profile has been updated.';
    } else {
      this.showErrorMessage(new Error(response.body.message));
    }
  }

  showErrorMessage(error: any): void {
    this.updatingUserInfo = false;
    this.errorMessage = error.message;
  }

  showUpdateMessage(msg: string) {
    this.updateMessage = msg;
  }

}
