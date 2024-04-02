import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegimeAlimentaire } from '../Models/HealthcareManag/regime alimentaire';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegimealimentaireService {
  private apiURL = 'http://localhost:8082';

  constructor(private http: HttpClient) { }
  getregimealimentaireById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getAllRegimealimentaire/${id}`);
  }

  
  addRegimeAlimentaire(regimeAlimentaire: RegimeAlimentaire): Observable<RegimeAlimentaire> {
    return this.http.post<RegimeAlimentaire>(`${this.apiURL}/addregimealimentaire`, regimeAlimentaire);
  }

  deleteRegimeAlimentaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/updateregimealimentaire/${id}`);
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

