import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Diagnostic } from '../Models/HealthcareManag/Diagnostic';


@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private apiURL = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  addDiagnostic(diagnostic: Diagnostic): Observable<any>{
    return this.http.post<any>(this.apiURL + '/addDignostic', diagnostic);
  }
  deleteDiagnostic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/deleteDignostic/${id}`);
  }

  updateDiagnostic(id: number, diagnostic: Diagnostic): Observable<any> {
    return this.http.put<Diagnostic>(`${this.apiURL}/updateDignostic/${id}`, diagnostic);
  }

  getDiagnosticById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getAllDiagnostic/${id}`);
  }

  findAllDiagnostics(): Observable<Diagnostic[]>{
    return this.http.get<Diagnostic[]>( this.apiURL + '/getAllDignostics');
  }

  getRegimeDiagnostic(diagnostic: Diagnostic): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getRegimeDiag/${diagnostic}`);
  }
  getDiagnosticsSortedByDateAscending(): Observable<Diagnostic[]> {
    console.log("asc");
    return this.http.get<Diagnostic[]>(`${this.apiURL}/sortedByDateAscending`);
  }

  getDiagnosticsSortedByDateDescending(): Observable<Diagnostic[]> {
    return this.http.get<Diagnostic[]>( `${this.apiURL}/sortedByDateDescending`);
  }

  /*recommendRegimeAlimentaire(diagnostic: Diagnostic): Observable<Diagnostic> {
    const typeRegime = this.getTypeRegimeForDiagnostic(diagnostic.typeDiagnostic); 
    return this.http.get<RegimeAlimentaire>(`${this.apiURL}/getRegimeAlimentaireByType/${typeRegime}`).pipe(
      map((regimeAlimentaire: RegimeAlimentaire) => {
        diagnostic.regimealime  = regimeAlimentaire;
        return diagnostic;
      })
    );
      


  }*/

 
}

