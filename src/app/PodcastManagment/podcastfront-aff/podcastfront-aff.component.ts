import { Component, ViewChild } from '@angular/core';
import { PodcastService } from '../ServicePodcast/podcast.service';
import { Podcast } from 'src/app/models/podcast';
import { MatDialog } from '@angular/material/dialog';
import { AddtofavComponent } from '../addtofav/addtofav.component';

@Component({
  selector: 'app-podcastfront-aff',
  templateUrl: './podcastfront-aff.component.html',
  styleUrls: ['./podcastfront-aff.component.css']
})
export class PodcastfrontAffComponent {
  podcasts: Podcast[]= [];
  titrePod!:string;
  p:number = 1;
  itemsParPage: number = 6 ;
  totalPodcast: any ;

  // pour play 
  @ViewChild('audioPlayer') audioPlayer: any;

  constructor( private podcastService : PodcastService, private dialog : MatDialog ){}

  ngOnInit(): void {
    this.loadPodcasts();
  }

  loadPodcasts(): void {
    this.podcastService.getAllPodcast().subscribe(
      (podcasts: Podcast[])=>{
        this.podcasts = podcasts
        this.totalPodcast = podcasts.length;
      },
      (error) =>{
      console.error('Error fetching events:', error);
      }
    );
  }
  getPodcastUrl(podcast: Podcast): string {
    return `http://localhost/Uploads/audio/${podcast.audio}`;
  }

  deletePodcast(id: number): void {
    this.podcastService.deletePodcast(id).subscribe((): void =>{
      this.loadPodcasts();
    });
  }

  /// pour play 
  playAudio(audio: any): void {
    audio.nativeElement.play();
  }
  /// pour pause 
  pauseAudio(audio: any): void {
    audio.nativeElement.pause();
  }

  getPodcastByTitre(): void {
    this.podcastService.getPodcastByTitre(this.titrePod).subscribe(podcasts => {
      this.podcasts = podcasts;
      });
  }

  openAddToFavoris(podcast : Podcast): void {
    const dialogRef = this.dialog.open(AddtofavComponent, {
      data: {podcast : podcast} // passer podcast selectionne 
    }) ; 
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result);
      }
    });
  }

  
  searchPodcastMUL(keyword: string): void {
    if (keyword.trim()) {
      this.podcastService.searchPodcastMUL(keyword).subscribe(
        (podcasts: Podcast[]) => {
          this.podcasts = podcasts;
          this.totalPodcast = podcasts.length;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.loadPodcasts(); // Load all events if keyword is empty
    }
  }


   
}



