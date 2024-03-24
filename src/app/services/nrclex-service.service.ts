import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {format} from "date-fns";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from "./local-storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class NrclexService {

  private baseUrl = 'https://api.my-eq.com/emotions/';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) {}

  getEmotions(userId: number, start: string, end: string, limit: number = 10, offset: number = 0): Observable<any> {
    // Prepare the HttpParams
    let params = new HttpParams()
      .set('start', start)
      .set('end', end)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    const bearerToken = this.localStorageService.getItem("jwt")

    return this.http.get<any>(`${this.baseUrl}${userId}`, {
      observe: 'response',
      params,
      headers: {
        'Authorization': `Bearer ${bearerToken}` // Set the Authorization header with the bearer token
      }
    }).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error('Server error');
        }
        return response.body;
      })
    );
  }

  getEmotionsForDay(userId: number, date?: Date): Observable<any> {
    // Use the provided date or the current date if none is provided
    const endDate = date ? new Date(date) : new Date();
    // Convert endDate to UTC
    endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());

    // Create a new Date object for startDate, 24 hours before endDate
    const startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - 1); // Subtract 24 hours

    // Format start and end dates to "YYYY-MM-DD HH:MM:SS"
    // Note: This assumes you're using date-fns library's format function or a similar utility
    const startFormatted = format(startDate, "yyyy-MM-dd HH:mm:ss");
    const endFormatted = format(endDate, "yyyy-MM-dd HH:mm:ss");

    let params = new HttpParams()
      .set('start', startFormatted)
      .set('end', endFormatted)
      .set('limit', '50')
      .set('offset', '0');

    const bearerToken = this.localStorageService.getItem("jwt")

    return this.http.get<any>(`${this.baseUrl}${userId}`, {
        observe: 'response',
        params,
        headers: {
          'Authorization': `Bearer ${bearerToken}` // Set the Authorization header with the bearer token
        }
    }).pipe(
      map(response => response) // Directly return the response, adjust as needed
    );
  }

  movingAverage(data: number[], windowSize: number): number[] {
    let result: number[] = [];

    for (let i = 0; i < data.length; i++) {
      if (i < windowSize - 1) {
        // Not enough data points to calculate average, just copy the data
        result.push(data[i]);
      } else {
        let sum = 0;
        for (let j = 0; j < windowSize; j++) {
          sum += data[i - j];
        }
        result.push(sum / windowSize);
      }
    }

    return result;
  }


  getEmotionsForWeek(userId: number, date?: Date): Observable<any> {
    // Use the provided date or the current date if none is provided
    const endDate = date ? new Date(date) : new Date();
    // Convert endDate to UTC
    endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());

    // Create a new Date object for startDate, 24 hours before endDate
    const startDate = new Date(endDate);
    startDate.setUTCDate(startDate.getUTCDate() - 7); // Subtract 24 hours

    // Format start and end dates to "YYYY-MM-DD HH:MM:SS"
    // Note: This assumes you're using date-fns library's format function or a similar utility
    const startFormatted = format(startDate, "yyyy-MM-dd HH:mm:ss");
    const endFormatted = format(endDate, "yyyy-MM-dd HH:mm:ss");

    let params = new HttpParams()
      .set('start', startFormatted)
      .set('end', endFormatted)
      .set('limit', '50')
      .set('offset', '0');

    const bearerToken = this.localStorageService.getItem("jwt")

    return this.http.get<any>(`${this.baseUrl}${userId}`, {
      observe: 'response',
      params,
      headers: {
        'Authorization': `Bearer ${bearerToken}` // Set the Authorization header with the bearer token
      }
    }).pipe(
      map(response => response) // Directly return the response, adjust as needed
    );
  }

}
