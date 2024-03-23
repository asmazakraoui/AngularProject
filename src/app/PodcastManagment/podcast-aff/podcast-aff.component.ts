import { Component, OnInit } from '@angular/core';
import { Podcast } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';

@Component({
  selector: 'app-podcast-aff',
  templateUrl: './podcast-aff.component.html',
  styleUrls: ['./podcast-aff.component.css']
})
export class PodcastAffComponent implements OnInit {
  podcasts: Podcast[]= [];

  constructor( private podcastService : PodcastService){}

  ngOnInit(): void {
    this.loadPodcasts();
  }

  loadPodcasts(): void {
    this.podcastService.getAllPodcast().subscribe(
      (podcasts: Podcast[])=>{
        this.podcasts = podcasts
      },
      (error) =>{
      console.error('Error fetching events:', error);
      }
    );
  }

  deletePodcast(id: number): void {
    this.podcastService.deletePodcast(id).subscribe((): void =>{
      this.loadPodcasts();
    });
  }

}
