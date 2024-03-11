import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private baseUrl = 'https://zge7mkfy2m.execute-api.us-west-2.amazonaws.com/dev/signup-otp';

  constructor(private http: HttpClient) { }

  sendOtp(phoneNumber: string): Observable<HttpResponse<any>> {
    const body = { phone_number: phoneNumber };
    return this.http.post<any>(`${this.baseUrl}`, body, {
      observe: 'response'
    });
  }


  verifyOtp(phoneNumber: string, otp: string): Observable<HttpResponse<any>> {
    const body = { phone_number: phoneNumber, code: otp };
    return this.http.put<any>(`${this.baseUrl}`, body, {
      observe: 'response'
    });
  }
}
