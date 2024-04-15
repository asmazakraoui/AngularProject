import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TypeReligion, User } from 'src/models/user';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8082/test'; 

  private failedLoginAttempts: { [username: string]: number } = {};

  constructor(private http: HttpClient , private router: Router) { }

  //authentification
  registerUser(firstName: string, lastName: string, password: string, mobileNumber: string, email: string, adressUser: string, etat: boolean, religion: TypeReligion, sexe: string, dateNaiss: Date, roleNames: string | string[], imageFile: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('mobileNumber', mobileNumber);
    formData.append('email', email);
    formData.append('adressUser', adressUser);
    formData.append('etat', etat.toString()); 
    formData.append('religion', religion.toString()); 
    formData.append('sexe', sexe); 
    formData.append('dateNaiss', dateNaiss.toISOString()); 
      // Handle roleNames as an array if it's a string
  if (typeof roleNames === 'string') {
    roleNames = roleNames.split(','); // Split string into array of role names
  }

  // Append each role name individually to formData
  roleNames.forEach(role => {
    formData.append('roleNames', role);
  });


    formData.append('imageFile', imageFile);
     // Append roleNames as comma-separated values

    return this.http.post<User>(`${this.baseUrl}/auth/register`, formData);
}

 

getCurrentUser(): Observable<User> {
  // Replace with your actual backend URL
  const url = 'http://localhost:8082/test/auth/current-user';

  // Add authorization header if your backend requires authentication
  const headers = new HttpHeaders({
    'Authorization': `Bearer your_access_token` // Replace with your token
  });

  return this.http.get<User>(url, { headers });
}

//generate token
login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/auth/token?username=${username}&password=${password}`, { username, password });
}
  
public loginUserToken(accessToken: string): boolean {
  try {
      localStorage.setItem('accessToken', accessToken);
      return true;
  } catch (error) {
      console.error('Error storing access token:', error);
      return false;
  }
}


//islogging
public isLoggedIn(){
  let tokenStr = localStorage.getItem('accessToken');
  if(tokenStr== undefined || tokenStr =='' || tokenStr == null){
    return false;
  }else{
    return true;
  }
}


logout(): Observable<void> {
  return this.http.get<void>(`${this.baseUrl}/auth/logout`, { responseType: 'text' as 'json' }).pipe(
    catchError(error => {
      console.error('Logout failed:', error);
      return throwError(error);
    }),
    tap(() => {
      console.log('User logged out successfully');
      this.clearLocalStorage(); // Clear all relevant items from localStorage
    })
  );
}

private clearLocalStorage(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('currentUser');
}
private handleError(error: HttpErrorResponse): Observable<string> {
  let errorMessage = 'Unknown error occurred';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Server error: ${error.status} - ${error.statusText}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}
//get token
getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

//setUserDetails
public setUser(user:User){
  localStorage.setItem('user',JSON.stringify(user));
}

getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}
//getUser
public getUser(){
  let userStr = localStorage.getItem('user');
  if(userStr != null){
    return JSON.parse(userStr);

  }else{
    this.logout();
    return null;
  }
}

//getUserRole
public getUserRole(){
  let user = this.getUser();
  return user.authorities[0].authority;
}


  private handleFailedLogin(username: string): void {
    if (!this.failedLoginAttempts[username]) {
      this.failedLoginAttempts[username] = 1;
    } else {
      this.failedLoginAttempts[username]++;
    }

    // Check if the user has exceeded the maximum number of failed login attempts
    if (this.failedLoginAttempts[username] > 2) {
      // Suspend the account here or notify the user about the suspension
      console.log('Account suspended for username:', username);
    }
  }
 
 
 

}