import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calendar } from '../model/calendarModel';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:8082/test/calendar';

  constructor(private http: HttpClient) {}

  saveDate(date: Date, userId: number): Observable<any> {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const body = {
      selectedDate: formattedDate,
      userId: userId
    };

    return this.http.post<any>(`${this.apiUrl}/${userId}`, body);
  }

  getCalendarsByUserId(userId: number): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(`${this.apiUrl}/getcalendarsbyuserid/${userId}`);
  }

  

  
}
