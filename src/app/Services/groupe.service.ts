import { Groupe } from './../models/groupe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private baseURL : string = 'http://localhost:8082/test/api/groupes'
  constructor(private http: HttpClient) { }


  /*updateChat(message: Message, idGrp: any): Observable<Object> {
    return this.httpClient.put(this.baseURL + "/chats/message/" + `${idGrp}`, message);
  }

  getChatById(idGrp: any) {
    return this.httpClient.get<Groupe>(this.baseURL + "/chats/" + idGrp)
  }

  createChatRoom(Groupe: Groupe): Observable<Object> {
    return this.httpClient.post(this.baseURL + "/chats/add", Groupe);
  }

  getChatByFirstUserNameAndSecondUserName(firstUserName: String, secondUserName: String) {
    return this.httpClient.get<Groupe>(this.baseURL + "/chats/getChatByFirstUserNameAndSecondUserName" + '?firstUserName=' + firstUserName + '&secondUserName=' + secondUserName)
  }

  getChatByFirstUserNameOrSecondUserName(username: any) {
    return this.httpClient.get<Groupe>(this.baseURL + "/chats/getChatByFirstUserNameOrSecondUserName/" + username)
  }*/

     addGroupe(groupe: Groupe): Observable<Object> {
    return this.http.post(`${this.baseURL}`, Groupe)
  }

  deleteGroupe(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  
}
}
