import { Component, OnInit } from "@angular/core";
import { CurrentUserService } from "../../services/current-user-service.service";
import {PhoneService} from "../../services/phone-service.service";
import { UserService } from "../../services/user-service.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { mapApiDataToUser } from "../../types/user";
import { AccountStatus } from "../../types/account-status";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent implements OnInit {
  errorMessage: string = "";
  phoneNumber: string = "";
  password: string = "";

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private phoneService: PhoneService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (
      this.currentUserService.isLoggedIn() &&
      this.currentUserService.getUser()?.accountStatusId === AccountStatus.ACTIVE
      ) {
      this.router.navigate(["/profile"]);

      return;
    }

  }

  login(): void {

    this.errorMessage = "";

    if (this.phoneNumber.trim() === "" || this.password.trim() === "") {
      this.errorMessage = `Phone number and password are required.`;

      return
    }

    this.phoneNumber = this.phoneService.normalizePhoneNumber(this.phoneNumber);

    this.userService.login(this.phoneNumber, this.password).subscribe(
      (response) => {

        let user = mapApiDataToUser(response.body.user);
        this.currentUserService.setJwt(response.body.token);
        this.router.navigate(["/profile"]);

        return
      },
      (error) => {

        // User still has to go through OTP to activate their account
        if ("User account is not active." === error.error.message) {
          this.router.navigate(["/otp"]);

          return;
        }

        this.errorMessage = error.error.message;
      }
    );
  }
}
