import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicament } from '../model/medicament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicamentService {
  private apiUrl = 'http://localhost:8082/test';
  constructor(private http: HttpClient) {}

  addMedicament(medicineData: FormData, userId: number): Observable<Medicament> {
    return this.http.post<Medicament>(`${this.apiUrl}/addmedicament/${userId}`, medicineData);
  }

  getMedicinesByUserId(userId: number): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(`${this.apiUrl}/getmedicamentsbyuserid/${userId}`);
  }

  updateMedicament (id: number, userId: number, medicament: Medicament): Observable<Medicament> {
    return this.http.put<Medicament>(`${this.apiUrl}/updatemedicament/${id}/${userId}`, medicament);
  }

  deleteMedicament(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletemedicament/${id}`);
  }

  getAllmedicines() : Observable<Medicament[]>{
    return this.http.get<Medicament[]>(`${this.apiUrl}/getAllmedicaments`);
  }

}
