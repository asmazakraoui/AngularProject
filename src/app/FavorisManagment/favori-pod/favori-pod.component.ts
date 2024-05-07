import { Component, OnInit, ViewChild } from '@angular/core';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { ActivatedRoute } from '@angular/router';
import { Podcast } from 'src/app/models/podcast';

@Component({
  selector: 'app-favori-pod',
  templateUrl: './favori-pod.component.html',
  styleUrls: ['./favori-pod.component.css']
})
export class FavoriPodComponent implements OnInit{
  id: any;
  podcasts: Podcast[] = [];
  p:number = 1;
  itemsParPage: number = 6 ;
  totalPodcast: any ;
  constructor(private favorisService : FavorisServiceService, private activateRoute: ActivatedRoute){}

  @ViewChild('audioPlayer') audioPlayer: any;

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.showPodcasts();
  }

  getPodcastUrl(podcast: Podcast): string {
    return `http://localhost/Uploads/audio/${podcast.audio}`;
  }

  /// pour play 
  playAudio(audio: any): void {
    audio.nativeElement.play();
  }

    /// pour pause 
    pauseAudio(audio: any): void {
      audio.nativeElement.pause();
    }

  showPodcasts(): void {
    this.favorisService.getPodcastsByFavorisId(this.id).subscribe(
      (podcasts: Podcast[]) => {
        this.podcasts = podcasts;
        console.log('Podcasts du favori:', this.podcasts);
        // Vous pouvez maintenant utiliser this.podcasts pour afficher les podcasts dans votre template HTML ou effectuer d'autres opérations.
      },
      (error) => {
        console.error('Error fetching Podcasts:', error);
      }
    );
  }

  deletePodcastFromFavoris(idPodcast: number): void {
    this.favorisService.deletePodcastFromFavoris(this.id, idPodcast).subscribe(
      (favoris: any) => {
        console.log('Podcast supprimé du favori:', favoris);
        // Mettre à jour la liste des podcasts après la suppression du podcast
        this.showPodcasts();
      },
      (error) => {
        console.error('Error deleting Podcast from favoris:', error);
      }
    );
  }


 

}
