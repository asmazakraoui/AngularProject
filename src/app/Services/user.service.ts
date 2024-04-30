import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError
import { ProfileRequest } from 'src/models/ProfileRequest';
import { User } from 'src/models/user';
import { catchError, map } from 'rxjs/operators';
import { Page } from 'src/models/Page';
import { RegisterService } from './register.service';
import { Injectable } from '@angular/core';
import { JobApplication } from 'src/models/JobApplication';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private apiUrl = 'http://localhost:8082/test/api/users'; // API endpoint


  constructor(private http: HttpClient,private registerService:RegisterService) { }

  retrieveUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/retrieveUser/${id}`);
  }
  retrieveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/retrieveUsers`); // Adjust the URL accordingly
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeUser/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/updateUser`, user);
  }
  manageProfile(idUser: number, profile: ProfileRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/manageProfile/${idUser}`, profile);
  }


  forgotPassword(emailData: { email: string }) {
    return this.http.post(`${this.apiUrl}/forgot-password`, emailData);
  }
  resetPassword(email: string, code: string, newPassword: string) {
    const url = `http://localhost:8082/test/api/users/reset-password?email=${email}&code=${code}&newPassword=${newPassword}`;
  
    // Log request payload
    console.log('Request Payload:', { email, code, newPassword });
  
    return this.http.post(url, {}).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
  
  
  

  getUserGenderRate(): Observable<Map<string, number>> {
    const url = `${this.apiUrl}/gender-rate`;
    return this.http.get<Map<string, number>>(url);
  }

  getUsersPerRole(): Observable<Map<string, number>> {
    const url = `${this.apiUrl}/users-per-role`;
    return this.http.get<Map<string, number>>(url);
  }
  getTotalNumberOfUsers(): Observable<number> {
    const url = `${this.apiUrl}/total`;
    return this.http.get<number>(url);
  }
  searchUsers(keyword: string): Observable<User[]> {
    const url = `${this.apiUrl}/search?keyword=${keyword}`;
    return this.http.get<User[]>(url);
  }
  getUsersWithPaginationAndSorting(offset: number, pageSize: number, field: string): Observable<Page<User>> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('pageSize', pageSize.toString())
      .set('field', field);

    return this.http.get<Page<User>>(`${this.apiUrl}/all`, { params });
  }

  getCurrentUser(): Observable<User | null> {
    const url = 'http://localhost:8082/test/auth/current-user';
    const headers = {};
        return this.http.get<User>(url, { headers })
      .pipe(
        map(response => response), // Assuming successful response maps to User object
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error retrieving user profile:', error);
    return throwError('Failed to retrieve user profile');
  }
  retrieveDoctors(): Observable<JobApplication[]> {
    const url = `${this.apiUrl}/retrieveDoctors`; // Construct the complete URL for the retrieveDoctors endpoint
    return this.http.get<JobApplication[]>(url);
  }
}
