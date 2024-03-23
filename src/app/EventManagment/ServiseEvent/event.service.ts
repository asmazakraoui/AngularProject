import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl : string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { } 


getAllEvent(): Observable<Event[]> {
  return this.http.get<Event[]>(this.baseUrl + 'Event/getAllEvent');
}
addEvent(event : Event): Observable<Event>{
  return this.http.post<Event>(this.baseUrl + 'Event/addEvent', event );
}
deleteEvent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}Event/deleteEvent/${id}`);
}
updateEvent(id: number, event : Event): Observable<Event> {
  return this.http.put<Event>(`${this.baseUrl}Event/updateEvent/${id}`, event);
}
getEventById(id:any):Observable<any>{
  return this.http.get(`${this.baseUrl}Event/getEventById/${id}`);
}
}


