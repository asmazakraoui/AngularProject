import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendar } from '../model/calendarModel';
import { Injectable } from '@angular/core';
import { Status } from '../model/statusModel';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:8082/test/api/calendars'; 
  

  constructor(private http: HttpClient) { }

  getAllCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.apiUrl);
  }

  changeStatus(id: number, newStatus: Status): Observable<Calendar> {
    const url = `${this.apiUrl}/${id}`;
    const body = { status: newStatus };
    return this.http.put<Calendar>(url, body, { params: { newStatus } });
  }
}