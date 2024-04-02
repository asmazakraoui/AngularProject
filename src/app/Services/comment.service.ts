import { Post } from './../models/Post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { Post } from '../models/Post';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private forbiddenWords: string[] = ['stupid', 'fuck', 'bad'];

  private baseURL =  'http://localhost:8082/test/api/comments'
  constructor(private http: HttpClient) { }

  findAllcomment() : Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseURL}/getComments`);

  }
  /*addComment(comment: Comment): Observable<Object> {
    return this.http.post<Comment>(`${this.baseURL}/addComment`, comment).pipe(
      catchError((error) => {
        console.error('Error adding comment:', error);
        return throwError('Error adding comment.'); // Vous pouvez personnaliser ce message d'erreur
      })
    );
  }*/
  

  getCommentById(id : number): Observable<Comment>{
    return this.http.get<Comment>(`${this.baseURL}/retrieveComment/${id}`) ;
  }

  updateComment(id: number, comment: Comment): Observable<object> {
    return this.http.put(`${this.baseURL}/updateComment/${id}`, comment);
  }

  deleteComment(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/removeComment/${id}`);
  }


/*
  
  addCommentToPost(comment: Comment, idPost: number): Observable<Comment> {
    comment.post = { idPost: idPost } as Post; // Create a Post object with the specified idPost
    const url = `${this.baseURL}/addCommentToPost/${idPost}`;
    
    if (this.containsForbiddenWords(comment.descCmnt)) {
      // If the comment contains forbidden words, emit an error observable
      return throwError('Comment contains bad words.');
    } else {
      // If the comment is valid, send it to the server
      return this.http.post<Comment>(url, comment).pipe(
        catchError((error) => {
          console.error(error);
          return throwError('Error adding comment.'); // You can customize this error message
        })
      );
    }
  }*/
  
  


 addCommentToPost(idPost: number, comment: Comment): Observable<any> {
  if (this.containsForbiddenWords(comment.descCmnt)) {
    return throwError('Sorry, your comment contains inappropriate language. Please refrain from using offensive words.');
  }
    const newComment: Comment = {
      idCmnt: 0, // Remplacez par l'ID approprié si nécessaire
      descCmnt: comment.descCmnt, // Utilisez la description du commentaire fournie
      dateCmnt: new Date(), // Ajoutez la date actuelle
      post: null // Remplacez par le post concerné s'il est disponible
    };

    return this.http.post(`${this.baseURL}/addComment/${idPost}`, newComment);
  }
  // badword
  private containsForbiddenWords(comment: string): boolean {
    for (const word of this.forbiddenWords) {
      if (comment.toLowerCase().includes(word)) {
        return true;
      }
    }
    return false;
  }



 getCommentsForPost(idPost: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/getCommentsForPost/${idPost}`);
  }
  
  createComment(idPost: number, comment: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/addComment/${idPost}/${comment}`, null);
  }
  
  
  /////

  getCommentBypostid(idPost: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/getCommentBypostid/${idPost}`);
  }

/*  deleteCommentsByPostId(postId: number): Observable<Object> {
  return this.http.delete(`${this.baseURL}/deleteCommentsByPostId/${postId}`);
}*/

  
 
}

