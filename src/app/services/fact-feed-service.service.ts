import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage-service.service';
import { Fact } from '../types/fact';

@Injectable({
  providedIn: 'root'
})
export class FactFeedService {

  public apiUrl = 'http://127.0.0.1:443/therapist/patients/facts'; // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService // Inject LocalStorageService
  ) { }

  getFactFeed(): Observable<Fact[]> {
    const bearerToken = this.localStorageService.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);

    return this.http.get<Fact[]>(this.apiUrl, {
      observe: 'response',
      headers
    }).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Server error');
        }
        return response.body!;
      }),
      catchError(this.handleError)
    );
  }

  getFactFeedById(id: number): Observable<Fact[]> {
    const bearerToken = this.localStorageService.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Fact[]>(url, {
      observe: 'response',
      headers
    }).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Server error');
        }
        return response.body!;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
