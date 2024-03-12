import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user-service.service';
import { OtpService } from '../../services/otp-service.service';
import { UserService } from '../../services/user-service.service';
import { User } from '../../types/user';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class OtpComponent implements OnInit {

  errorMessage: string = '';
  currentUser: User;
  otp: string = '';

  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private otpService: OtpService,
    private router: Router
  ) {
    this.currentUser = this.currentUserService.getUser()!;
  }

  ngOnInit(): void {

    if (this.currentUser === null || this.currentUser === undefined) {
      console.log("Current user service has no current user")
      this.router.navigate(['/signup']);
      return
    }

    if (this.currentUser.phone_number === null) {
      console.log("Current user service has no current user phone number")
      this.router.navigate(['/signup']);
      return
    }
  }

  verifyOtp() {
    this.errorMessage = '';

    if (this.otp.length !== 4) {
      this.errorMessage = 'The code must be 4 digits';
      return;
    }

    this.otpService.verifyOtp(this.currentUser.phone_number, this.otp).subscribe({
      next: (res) => {
        switch (res.status) {
          case 200:
            this.userService.activate(this.currentUserService.getUser()!);
            this.router.navigate(['/profile']);
            break;
          case 304:
            this.errorMessage = 'The code you entered is incorrect';
            break;
          default:
            this.errorMessage = res.body.message || 'An error occurred during verification';
        }
      },
      error: (err) => {
        if( err.status === 304) {
          this.errorMessage = 'Check your code and try again. You should have received a text at: '
            + this.currentUser.phone_number;

          return;
        }
        this.errorMessage = err.error.message || 'An error occurred during verification';
      }
    });
  }
}
