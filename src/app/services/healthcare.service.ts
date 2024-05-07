import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { healthcare } from '../model/Healthcare';
@Injectable({
  providedIn: 'root'
})
export class HealthcareService {
  private apiURL = 'http://localhost:8082/test';

  constructor(private http: HttpClient) { }
  
  addHealthcare(healtcare: healthcare): Observable<healthcare>{
    return this.http.post<healthcare>(this.apiURL + '/addHealthCare', healtcare);
  }
  deleteHealthcare(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/deleteHealthCare/${id}`);
  }

  updateHealthcare(id: number, healtcare: healthcare): Observable<any> {
    return this.http.put<healthcare>(`${this.apiURL}/updateHealthCare/${id}`, healtcare);
  }

  getHealthcareById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getAllHealthCare/${id}`);
  }

  findAllHealthcares(): Observable<healthcare[]>{
    return this.http.get<healthcare[]>( this.apiURL + '/getAllHealthCare');
  }

}
