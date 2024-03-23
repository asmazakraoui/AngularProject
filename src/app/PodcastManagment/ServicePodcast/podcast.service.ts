import { HttpClient } from '@angular/common/http';
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

  addPodcast(pod: Podcast): Observable<Podcast>{
    return this.http.post<Podcast>(this.baseUrl+'Podcast/addPodcast',pod);
  }

  deletePodcast(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}Podcast/deletePodcast/${id}`);
  }

  updatePodcast(id: number , pod : Podcast): Observable<Podcast>{
    return this.http.put<Podcast>(`${this.baseUrl}Podcast/updatePodcast/${id}`,pod);
  }

  getPodcastById(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}Podcast/getPodcastById/${id}`);
  }
}
