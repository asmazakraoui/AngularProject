import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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

  addBook(formData : FormData): Observable<Book>{
    return this.http.post<Book>(this.baseUrl + 'Book/addBook', formData);
  }

  deleteBook(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}Book/deleteBook/${id}`);
  } 

  updateBook(id: number , formData:FormData): Observable<Book>{
    return this.http.put<Book>(`${this.baseUrl}Book/updateBook/${id}`, formData);
  }

  getBookById(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}Book/findBookById/${id}`);
  }

  
  addBookToLibrary(bookId: number, libraryName: string): Observable<Book> {
    // Construct request parameters
    let params = new HttpParams().set('ttLibrary', libraryName);

    // Make POST request to the endpoint with the book ID as path variable and library name as request parameter
    return this.http.post<Book>(`${this.baseUrl}Book/${bookId}/addBookToLibrary`, null, { params });
  }

  downloadPdf(pdfFileName: string): void {
    // Construire l'URL complète du fichier PDF
    const pdfUrl = `${this.baseUrl}Uploads/PDFs/${pdfFileName}`;

    // Envoyer une requête GET pour télécharger le fichier PDF
    this.http.get(pdfUrl, { responseType: 'blob' }).subscribe(response => {
      // Créer un objet Blob à partir de la réponse
      const blob = new Blob([response], { type: 'application/pdf' });

      // Créer un lien temporaire pour télécharger le fichier PDF
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = pdfFileName;
      link.click();
    });
  }

  searchBookBack(keyword: string): Observable<Book[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Book[]>(`${this.baseUrl}Book/searchbookMULTIPLE`, { params });
  }



}
