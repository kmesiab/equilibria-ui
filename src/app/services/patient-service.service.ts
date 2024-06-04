import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Patient } from '../types/patient'; // Adjust the import according to your project structure

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://api.my-eq.com/patients'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<{ status: number, data: Patient[] }>(this.apiUrl, {
      observe: 'response'
    }).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Server error');
        }
        return response.body ? response.body.data : [];
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
