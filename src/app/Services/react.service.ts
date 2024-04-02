//import { TypeReact } from './../models/react';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { React } from '../models/react';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactService {
  private baseURL : string = 'http://localhost:8082/test/api/react'
  constructor(private http: HttpClient) {
    
   }

   /*addReact(react: React): Observable<React> {
    return this.http.post<React>(`${this.baseURL}/add`, react);
  }*/
  /* addReactToPost(typeReact: React, idPost: number): Observable<React> {
   
    return this.http.post<React>(`${this.baseURL}/add/${idPost}`, typeReact);
  }  */

  removeReact(idReact: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/remove/${idReact}`);
  }

  likePost(idPost: number): Observable<any> {
    const url = `${this.baseURL}/like/${idPost}`;
    return this.http.post<any>(url, null);}

  dislikePost(idPost: number): Observable<any> {
      const url = `${this.baseURL}/dislike/${idPost}`;
      return this.http.post<any>(url, null);}

      
      getTotalLikesByPostId(idPost: number): Observable<number> {
        const url = `${this.baseURL}/total-likes/${idPost}`;
        return this.http.get<number>(url);
      }
    
      getTotalDislikesByPostId(idPost: number): Observable<number> {
        const url = `${this.baseURL}/total-dislikes/${idPost}`;
        return this.http.get<number>(url);
      }


}
