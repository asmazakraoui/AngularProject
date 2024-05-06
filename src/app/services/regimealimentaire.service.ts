import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegimeAlimentaire } from '../model/regime alimentaire';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegimealimentaireService {
  private apiURL = 'http://localhost:8082/test';

  constructor(private http: HttpClient) { }





  addRegime (regimeData: FormData, userId: number): Observable<RegimeAlimentaire> {
    return this.http.post<RegimeAlimentaire>(`${this.apiURL}/addRegime/${userId}`, regimeData);
  }

  getRegimesByUserId(userId: number): Observable<RegimeAlimentaire[]> {
    return this.http.get<RegimeAlimentaire[]>(`${this.apiURL}/getregimesbyuserid/${userId}`);
  }

  updateRegime(id: number, userId: number, regimeAlimentaire: RegimeAlimentaire): Observable<RegimeAlimentaire> {
    return this.http.put<RegimeAlimentaire>(`${this.apiURL}/updateregimealimentaire/${id}/${userId}`, regimeAlimentaire);
  }

  deleteRegimeAlimentaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/updateregimealimentaire/${id}`);
  }




  getregimealimentaireById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getAllRegimealimentaire/${id}`);
  }

  
  addRegimeAlimentaire(regimeAlimentaire: RegimeAlimentaire): Observable<RegimeAlimentaire> {
    return this.http.post<RegimeAlimentaire>(`${this.apiURL}/addregimealimentaire`, regimeAlimentaire);
  }

 

  updateRegimeAlimentaire(id: number, regimeAlimentaire: RegimeAlimentaire): Observable<RegimeAlimentaire> {
    return this.http.put<RegimeAlimentaire>(`${this.apiURL}/updateregimealimentaire/${id}`, regimeAlimentaire);
  }

  getAllRegimeAlimentaire(): Observable<RegimeAlimentaire[]> {
    return this.http.get<RegimeAlimentaire[]>(`${this.apiURL}/getAllRegimealimentaire`);
  }

  getRegimeAlimentaireById(id: number): Observable<RegimeAlimentaire> {
    return this.http.get<RegimeAlimentaire>(`${this.apiURL}/getAllRegimealimentaire/${id}`);
  }
}

