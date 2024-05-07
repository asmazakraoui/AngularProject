import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Podcast, TypePod } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-podcast-add',
  templateUrl: './podcast-add.component.html',
  styleUrls: ['./podcast-add.component.css']
})
export class PodcastAddComponent {

  podcastForm: FormGroup;
  selectedFile: File | null = null;
  siteKey:string = "6Le6P7wpAAAAABm999JF34z50hLi7BYFFHXBtaXS";

  typePodcastOptions: string[] = Object.values(TypePod);

  constructor(private formBuilder : FormBuilder , private podcastService : PodcastService, public dialogRef: MatDialogRef<PodcastAddComponent>){
    this.podcastForm = this.formBuilder.group({
      titrePod: ['',Validators.required],
      typePod: [null,Validators.required],
      recaptcha: ['', Validators.required]
    });
  }
  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
  }

  addPodcast(): void{
    if (this.podcastForm.valid && this.selectedFile){
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const titrePod = this.podcastForm.get('titrePod')?.value;
      const typePod = this.podcastForm.get('typePod')?.value;
      if ( titrePod && typePod){
        formData.append('titrePod', titrePod);
        formData.append('typePod', typePod);
      } else {
        console.error("One or more form values are null.");
        return;
      }

      this.podcastService.addPodcast(formData).subscribe(()=>{
        alert("Podcast Added");
        this.podcastForm.reset();
        this.selectedFile = null;
      },
      err => {
        alert("An error occurred while adding Podcast");
        console.error(err);
      }
      );
    } else {
      alert("Please fill in all the required fields")
    }
  }

  cancelEdit(): void {
    this.podcastForm.reset();
  }

}
