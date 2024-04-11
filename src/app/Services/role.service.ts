import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8082/test/api/roles'; 


  constructor(private http: HttpClient) { }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/addRole`, role);
  }


  updateRole(role: Role): Observable<Role> {
    const url = `${this.baseUrl}/updateRole`; 
    return this.http.put<Role>(url, role);
  }

  findAll() : Observable<Role[]>{
    return this.http.get<Role[]>(`${this.baseUrl}/get`);
  }
}
