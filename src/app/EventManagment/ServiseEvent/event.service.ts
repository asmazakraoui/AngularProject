import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Event } from 'src/app/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl : string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { } 


// getAllEvent(): Observable<Event[]> {
//   return this.http.get<Event[]>(this.baseUrl + 'Event/getAllEvent');
// }

getAllEvent(): Observable<Event[]> {
  return this.http.get<Event[]>(this.baseUrl + 'Event/getAllEvent', { responseType: 'json' });
}
addEvent(formData : FormData): Observable<Event>{
  return this.http.post<Event>(this.baseUrl + 'Event/addEvent', formData );
}
deleteEvent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}Event/deleteEvent/${id}`);
}


updateEvent(id: number, formData : FormData): Observable<Event> {
  console.log(formData);
  return this.http.put<Event>(`${this.baseUrl}Event/updateEvent/${id}`, formData);
}


getEventById(id:any):Observable<any>{
  return this.http.get(`${this.baseUrl}Event/getEventById/${id}`);
}

assignEventToUser(eventId: number, userId: number): Observable<string> {
  return this.http.put<string>(`${this.baseUrl}Event/assignEventToUser/${eventId}/${userId}`, {});
}

getEventsWithAvailablePlaces(): Observable<Event[]> {
  return this.http.get<Event[]>(this.baseUrl + 'Event/available');
}

getEventsByUser(userId: number): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.baseUrl}Event/eventsByUser/${userId}`);
}
deleteEventFromUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}Event/deleteEventFromUser/${id}`);
}

getEventByTitre(titreEvent: string): Observable<Event[]> {
  console.log("test");
  return this.http.get<Event[]>(`${this.baseUrl}Podcast/searchPod/${titreEvent}`);
}


removeEventFromUser(eventId: number, userId: number): Observable<any> {
  const url = `${this.baseUrl}Event/effacer/${eventId}/${userId}`;
  return this.http.delete(url).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
  );
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.error || error);
}

searchEvents(keyword: string): Observable<Event[]> {
  const params = new HttpParams().set('keyword', keyword);
  return this.http.get<Event[]>(`${this.baseUrl}Event/searchEventMUL`, { params });
}

searchEventBack(keyword: string): Observable<Event[]> {
  const params = new HttpParams().set('keyword', keyword);
  return this.http.get<Event[]>(`${this.baseUrl}Event/searchEventBack`, { params });
}
}


