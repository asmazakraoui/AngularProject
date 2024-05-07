import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseURL : string = 'http://localhost:8082/test/AngularProject'
  constructor(private http : HttpClient) {}


   getmessageList() : Observable<Message[]>{
    return this.http.get<Message[]>(`${this.baseURL}`);

  }
  addMessage(message: Message): Observable<Object> {
    return this.http.post(`${this.baseURL}`, Message)
  }


  getMessageById(id : number): Observable<Message>{
    return this.http.get<Message>(`${this.baseURL}/${id}`) ;
  }

  updateMessage(id: number, message: Message): Observable<object> {
    return this.http.put(`${this.baseURL}/${id}`, message);
  }

  deleteMessage(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
