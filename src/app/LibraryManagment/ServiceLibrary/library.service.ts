import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Library } from 'src/app/models/library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  
  private baseUrl : string = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }


    addLibrary(lib : Library): Observable<any> {
      return this.http.post<Library>(this.baseUrl + 'Library/addLibrary', lib);
    }

    updateLibrary(id: number, lib : Library): Observable<Library>{
      return this.http.put<Library>(`${this.baseUrl}Library/updateLibrary/${id}`, lib);
    }

    getAllLibrary(): Observable<Library[]>{
      return this.http.get<Library[]>(this.baseUrl + 'Library/getAllLibrary');
    }

    deleteLibrary(id:number): Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}Library/deleteLibrary/${id}`);
    }
    
    getLibraryById(id: number): Observable<Library>{
      return this.http.get<Library>(`${this.baseUrl}Library/getLibraryById/${id}`)
    }

    getLibrariesByUserId(userId: number): Observable<Library[]> {
      return this.http.get<Library[]>(`${this.baseUrl}Library/getLibByIdUser/${userId}`);
    }


    getBooksByLibraryId(idLibrary: number): Observable<Book[]> {
      return this.http.get<Book[]>(`${this.baseUrl}Library/getBookByLibraryId/${idLibrary}`);
    }


    deleteBookFromLibrary(idLibrary:number , idBook:number):Observable<Library>{
      return this.http.delete<Library>(`${this.baseUrl}Library/DeleteBookFromLIB/${idLibrary}/${idBook}`);
    }

    // updateTtLibrary(idLibrary: number, ttLibrary: string): Observable<Library> {
    //   return this.http.put<Library>(`${this.baseUrl}Library/updateTtLibrary/${idLibrary}?`, null, {params: {ttLibrary}} );
    // }

    
//     updateTtLibrary(idLibrary: number, ttLibrary: string): Observable<Library> {
//       return this.http.put<Library>(`${this.baseUrl}Library/updateTtLibrary/${idLibrary}`, null, { params: { ttLibrary } });
// }

updateTtLibrary(idLibrary: number, ttLibrary: string): Observable<Library> {
  // Utiliser un objet vide comme corps de la requête
  return this.http.put<Library>(`${this.baseUrl}Library/updateTtLibrary/${idLibrary}`, {}, { params: { ttLibrary } });

  
}
// downloadPDF(fileName: string): Observable<any> {
//   const httpOptions = {
//     responseType: 'blob' as 'json' // Spécifiez le type de réponse comme un blob
//   };
//   return this.http.get(`${this.baseUrl}api/files/pdfs/${fileName}`, httpOptions);
// }

downloadPdf(fileName: string): Observable<any> {
  const url = `${this.baseUrl}api/files/pdfs/${fileName}`;
  return this.http.get(url, { responseType: 'blob' });
}


// downloadPDF(fileName: string): Observable<HttpResponse<Blob>> {
//   // Set the headers to specify that you expect a binary response
//   const httpOptions = {
//     responseType: 'blob' as 'json', // Important: responseType should be 'blob' for file download
//     observe: 'response' as 'body', // observe should be 'response' to get the full response including headers
//   };

//  // Make the GET request to download the PDF file
//   return this.http.get(this.baseUrl + `/api/files/pdfs/${fileName}`, { ...httpOptions, observe: 'response' }) as Observable<HttpResponse<Blob>>;
// }

   


}
