import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Podcast } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';

@Component({
  selector: 'app-addtofav',
  templateUrl: './addtofav.component.html',
  styleUrls: ['./addtofav.component.css']
})
export class AddtofavComponent {
  favoriForm!:FormGroup;
  podcast!:Podcast;

  constructor(
    public dialogRef: MatDialogRef<AddtofavComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {podcast : Podcast},
    private formBuilder: FormBuilder,
    private podcastService: PodcastService
  ){
    this.podcast = data.podcast; // recuperer le podcast passe en data
    this.initFavoriForm(); 
  }

  initFavoriForm() {
    this.favoriForm = this.formBuilder.group ({
      nomFav: ['',Validators.required]
    });
  }

  onCancel (): void {
    this.dialogRef.close();
  }

  addPodcastToFavoris(idPod: number): void {
    const nomFav = this.favoriForm.value.nomFav;
    if (nomFav.trim()===''){
      return;
    }
    this.podcastService.addPodcastToFavoris(idPod, nomFav).subscribe(
      (res)=>{
        console.log('podcast added to library', res);
        this.dialogRef.close(true);
      },
      (err)=> {
        console.error('error adding podcast to favris:', err);
      }
    );
  }

}
