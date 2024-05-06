import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:8082/test'; 
  constructor(private http: HttpClient) { }

  addReport(reportData: FormData, userId: number): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/addReport/${userId}`, reportData);
  }

  generatePdfReport(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/${id}/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadPdfReport(reportId: number): Observable<Blob> {
    const url = `${this.apiUrl}/reports/${reportId}/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getReportsByUserId(userId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/getreportsbyuserid/${userId}`);
  }

  
  updateReport (id: number, userId: number, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/updatereport/${id}/${userId}`, report);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteReport/${id}`);
  }


}
