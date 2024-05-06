import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ReservedDateService {
  private apiUrl = 'http://localhost:8082/test';

  constructor(private http: HttpClient) {}

  addUnavailableDate(date: string, userId: number): Observable<any> {
    const url = `${this.apiUrl}/addUnavailableDate/${userId}`;
    const params = new HttpParams().set('dateReport', date);
    return this.http.post(url, null, { params });
  }
  getUnavailableDatesByUserId(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/getnavailableDatesbyuserid/${userId}`;
    return this.http.get<any[]>(url);
  }
}
