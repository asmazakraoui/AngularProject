import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl : string = 'http://localhost:8080/';

  constructor(private http : HttpClient) { }

  getAllBook(): Observable<Book[]>{
    return this.http.get<Book[]>(this.baseUrl+ 'Book/getAllBooks');
  }

  addBook(book : Book): Observable<Book>{
    return this.http.post<Book>(this.baseUrl + 'Book/addBook', book);
  }

  deleteBook(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}Book/deleteBook/${id}`);
  } 

  updateBook(id: number , book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.baseUrl}Book/updateBook/${id}`, book);
  }

  getBookById(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}Book/findBookById/${id}`);
  }

}
