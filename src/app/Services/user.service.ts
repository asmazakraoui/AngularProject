import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL: string = 'http://localhost:8082/test/api/user';

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/create`, user);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/read`);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/lire/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseURL}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${id}`);
  }



  /*getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL + "/getall");
  }

  addUser(user: User): Observable<Object> {
    return this.httpClient.post(this.baseURL + "/add", user);
  }

  getUserByUsername(username: any): Observable<User> {
    return this.httpClient.get<User>(this.baseURL + "/getbyusername/" + username);
  }*/

/*  // Méthode pour récupérer un utilisateur statique
  getStaticUser(): Observable<any> {
    // Retourne un objet utilisateur statique avec des valeurs fictives
    const staticUser = {
      id: 1,
      nom: 'asma',
      prenom: 'Test',
      email: 'test@example.com'
      // Ajoutez d'autres champs si nécessaire
    };
    return of(staticUser); // Utilisez la fonction 'of' de RxJS pour retourner un observable de l'utilisateur statique
  }*/



}
