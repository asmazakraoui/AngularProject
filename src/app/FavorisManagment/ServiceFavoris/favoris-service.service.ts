import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favoris } from 'src/app/models/favoris';
import { Podcast } from 'src/app/models/podcast';

@Injectable({
  providedIn: 'root'
})
export class FavorisServiceService {

  private baseUrl : string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  addFavoris(fav : Favoris): Observable<Favoris>{
    return this.http.post<Favoris>(this.baseUrl+ 'Favoris/addFavoris', fav);
  }

  getAllFavoris(): Observable<Favoris[]>{
    return this.http.get<Favoris[]>(this.baseUrl + 'Favoris/getAllFavoris');
  }

  deleteFavoris(id: number): Observable<void> {
   return this.http.delete<void>(`${this.baseUrl}Favoris/deleteFavoris/${id}`); 
  }

  updateFavoris(id: number , fav : Favoris): Observable<Favoris>{
    return this.http.put<Favoris>(`${this.baseUrl}Favoris/updateFavoris/${id}`, fav);
  }

  getFavorisById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Favoris/getFavorisById/${id}`);
  }

  getPodcastsByFavorisId(id: number): Observable<Podcast[]>{
    return this.http.get<Podcast[]>(`${this.baseUrl}Favoris/getPodcastsByFavorisId/${id}`);
  }

  getFavorisByIdduser(idduser: number): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(`${this.baseUrl}Favoris/getFavbyIduser/${idduser}`);
  }

  deletePodcastFromFavoris(idFav: number, idPodcast: number): Observable<Favoris> {
    return this.http.delete<Favoris>(`${this.baseUrl}Favoris/deletePodcastFromFavoris/${idFav}/${idPodcast}`);
  }

  updateNomFavoris(id: number , nomFav : string): Observable<Favoris>{
    return this.http.put<Favoris>(`${this.baseUrl}Favoris/updateNomFavoris/${id}`, null, { params: { nomFav } });
  }
 

}
