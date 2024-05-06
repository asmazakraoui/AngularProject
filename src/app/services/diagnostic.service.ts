import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Diagnostic } from '../model/Diagnostic';


@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private apiURL = 'http://localhost:8082/test';

  constructor(private http: HttpClient) { } 



  createDiagnostic(diagnosticData: FormData, userId: number): Observable<Diagnostic> {
    console.log('Request payload:', diagnosticData);
    console.log('User ID:', userId);
    return this.http.post<Diagnostic>(`${this.apiURL}/addDignostic/${userId}`, diagnosticData);

    
  }

  updateDiagnosticc (id: number, userId: number, diagnostic: Diagnostic): Observable<Diagnostic> {
    return this.http.put<Diagnostic>(`${this.apiURL}/updatediagnostic/${id}/${userId}`, diagnostic);
  }


  getDiagnosticsByUserId(userId: number): Observable<Diagnostic[]> {
    return this.http.get<Diagnostic[]>(`${this.apiURL}/getdiagnosticsbyuserid/${userId}`);
  }


  deleteDiagnostic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/deleteDignostic/${id}`);
  }





  addDiagnostic(diagnostic: Diagnostic): Observable<any>{
    return this.http.post<any>(this.apiURL + '/addDignostic', diagnostic);
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

