import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
