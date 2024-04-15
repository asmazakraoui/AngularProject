import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
//import { Post } from '../models/post';
import { React } from '../models/react';
//import { TypeReact } from '../models/react';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL = 'http://localhost:8082/test/api/posts';
 
  constructor(private http: HttpClient) {}
   

  findAll() : Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseURL}/get`);

  }
addPost(formData : FormData): Observable<Post>{
  return this.http.post<Post>(this.baseURL + '/addPost', formData );
}


  getPostById(id : number): Observable<Post>{
    return this.http.get<Post>(`${this.baseURL}/retrievePost/${id}`) ;
  }

  /*updatePost(id: number, post: Post): Observable<any> {
    return this.http.put(`${this.baseURL}/updatePost/${id}`, post);
  }*/
  
  updatePost(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseURL}/updatePost/${id}`, formData);
  }

  deletePost(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/removePost/${id}`);
 
}


/*addLikeToPost(React: React, idPost:number){
  return this.http.post(`${this.baseURL}/addReactToPost/${idPost}`, React);

}
addDislikeToPost(React: React, idPost:number){
  return this.http.post(`${this.baseURL}/addReactToPost/${idPost}`, React);}



addReactToPost(React: React, idPost: number): Observable<React> {
  return this.http.post<React>(`${this.baseURL}/add/${idPost}`, React);
}*/

getPostsByDescPost(descPost: string): Observable<Post[]> {
  const url = `${this.baseURL}/filter/${descPost}`;
  return this.http.get<Post[]>(url);
}

/*likePost(idPost: number): Observable<any> {
    const url = `${this.baseURL}/like/${idPost}`;
    return this.http.post<any>(url, null);}

  dislikePost(idPost: number): Observable<any> {
      const url = `${this.baseURL}/dislike/${idPost}`;
      return this.http.post<any>(url, null);}*/



  searchPost(keyword: string): Observable<Post[]> {
        const url = `${this.baseURL}/search?keyword=${keyword}`;
        return this.http.get<Post[]>(url);
      }
}
