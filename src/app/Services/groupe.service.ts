import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Groupe } from '../models/groupe';
@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private baseURL : string = 'http://localhost:8082/AngularProject'
  constructor(private http: HttpClient) {
    }
  
  addGroupe(groupe: Groupe): Observable<Object> {
    return this.http.post(`${this.baseURL}`, Groupe)
  }

  deleteGroupe(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  
}
}
