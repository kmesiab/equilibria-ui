import { AccountStatus } from "../types/account-status";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../types/user";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentUserService } from "./current-user-service.service"

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl =
    "https://zge7mkfy2m.execute-api.us-west-2.amazonaws.com/dev";

  constructor(
    private http: HttpClient,
    private currentUserService: CurrentUserService,
    ) {}

  getUserByIdOrPhoneNumber(id: string): Observable<User> {
    return this.http
      .get<any>(`${this.baseUrl}/users/${id}`)
      .pipe(map((apiData) => this.mapApiDataToUser(apiData)));
  }

  signup(user: User): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/users`, user, {
      observe: "response",
    });
  }

  activate(user: User): Observable<HttpResponse<any>> {
    user.accountStatusId = AccountStatus.ACTIVE;
    return this.http.put<any>(`${this.baseUrl}/users`, user, {
      observe: "response",
      headers: {
        Authorization: `Bearer ${this.currentUserService.getJwt()}`,
      },
    });
  }

  update(user: User): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.baseUrl}/users`, user, {
      observe: "response",
      headers: {
        Authorization: `Bearer ${this.currentUserService.getJwt()}`,
      },
    });
  }

  login(phoneNumber: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${this.baseUrl}/login`,
      {
        phone_number: phoneNumber,
        password: password,
      },
      {
        observe: "response",
        headers: {
          Authorization: `Bearer ${this.currentUserService.getJwt()}`,
        },
      }
    );
  }

  private mapApiDataToUser(apiData: any): User {
    // Implement the mapping logic here
    return {
      id: apiData.id,
      firstname: apiData.firstname,
      lastname: apiData.lastname,
      email: apiData.email,
      phone_number: apiData.phone_number,
      password: apiData.password,
      accountVerified: apiData.phone_verified,
      accountStatus: apiData.status,
      accountStatusId: apiData.status_id,
      user_type_id: apiData.user_type_id,
      nudge_enabled: apiData.nudge_enabled,
      provider_code: apiData.provider_code,
    };
  }
}
