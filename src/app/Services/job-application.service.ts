import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private baseUrl = 'http://localhost:8082/test/auth'; 

  constructor(private http: HttpClient) { }

  applyForJob(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/apply`;

    // Set up HTTP headers if needed
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(url, formData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        if (error.status === 400) {
          // Email already exists error
          return throwError('Email already exists');
        } else {
          // Other errors
          return throwError('Failed to process job application');
        }
      })
    );
  }
}

