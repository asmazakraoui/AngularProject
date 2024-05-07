import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Podcast } from 'src/app/models/podcast';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  private baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllPodcast(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(this.baseUrl + 'Podcast/getAllPodcast');
  }

  addPodcast(formData: FormData): Observable<Podcast>{
    return this.http.post<Podcast>(this.baseUrl+'Podcast/addPodcast',formData);
  }

  deletePodcast(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}Podcast/deletePodcast/${id}`);
  }

  updatePodcast(id: number , formData : FormData): Observable<Podcast>{
    return this.http.put<Podcast>(`${this.baseUrl}Podcast/updatePodcast/${id}`,formData);
  }

  getPodcastById(id:any): Observable<any>{
    console.log(id);
    return this.http.get(`${this.baseUrl}Podcast/getPodcastById/${id}`);
  }
  getPodcastByTitre(titrePod: string): Observable<Podcast[]> {
    console.log("test");
    return this.http.get<Podcast[]>(`${this.baseUrl}Podcast/searchPod/${titrePod}`);
  }

  addPodcastToFavoris(idPod: number, nomFav: string): Observable<Podcast> {
    // Construire les paramètres de la requête
    let params = new HttpParams().set('nomFav', nomFav);

    // Faire une requête POST à l'URL avec l'ID du podcast en tant que variable de chemin et le nom favori comme paramètre de requête
    return this.http.post<Podcast>(`${this.baseUrl}Podcast/${idPod}/addPodcastToFavoris`, null, { params });
  }
  
  removePodcastFromFavoris(idPod: number, idFav: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Podcast/${idPod}/removePodcastFromFavoris/${idFav}`);
  }

  searchPodcastMUL(keyword: string): Observable<Podcast[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Podcast[]>(`${this.baseUrl}Podcast/searchPodcastMULTIPLE`, { params });
  }
 
 
}
