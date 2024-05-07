import { Component, OnInit, ViewChild } from '@angular/core';
import { Podcast } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';
import { MatDialog } from '@angular/material/dialog';
import { PodcastAddComponent } from '../podcast-add/podcast-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-podcast-aff',
  templateUrl: './podcast-aff.component.html',
  styleUrls: ['./podcast-aff.component.css']
})
export class PodcastAffComponent implements OnInit {
  //podcasts: Podcast[]= [];
 podcasts!: MatTableDataSource<Podcast>;  
 @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['titrePod', 'typePod', 'audio', 'actions'];

  showUpdatePodcastModal: boolean = false;
  podcastIdToUpdate!: number;
  
  // pour play 
  @ViewChild('audioPlayer') audioPlayer: any;

  constructor( private podcastService : PodcastService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.loadPodcasts();
  }
  
  loadPodcasts(): void {
    this.podcastService.getAllPodcast().subscribe(
      (podcasts: Podcast[]) => {
        // Initialisez votre source de données avec vos podcasts
        this.podcasts = new MatTableDataSource<Podcast>(podcasts);
        this.podcasts.paginator = this.paginator; // Associez le MatPaginator à la source de données
      },
      (error) => {
        console.error('Error fetching podcasts:', error);
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

  openAddPodcast(enteranimation: any , exitanimation:any, code: any){
    const dialogRef = this.dialog.open(PodcastAddComponent,{
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width:'30%',
      data: {
        empcode: code
      },
      panelClass : 'center-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success'){
        this.loadPodcasts();
      }
    });
  }

  openUpdatePodcast(podID: number): void {
    this.podcastIdToUpdate = podID;
    this.showUpdatePodcastModal = true;
  }  

  closeUpdatePodcastModal(){
    this.showUpdatePodcastModal= false;
  }

  // openUpdatePodcast(enteranimation: any , exitanimation:any, code: any){
  //   const dialogRef = this.dialog.open(PodcastUppComponent,{
  //     enterAnimationDuration: enteranimation,
  //     exitAnimationDuration: exitanimation,
  //     width:'30%',
  //     data: {
  //       empcode: code
  //     },
  //     panelClass : 'center-dialog'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'success'){
  //       this.loadPodcasts();
  //     }
  //   });
  // }
}
