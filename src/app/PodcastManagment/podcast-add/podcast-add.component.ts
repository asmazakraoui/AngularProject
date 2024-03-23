import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Podcast, TypePod } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';

@Component({
  selector: 'app-podcast-add',
  templateUrl: './podcast-add.component.html',
  styleUrls: ['./podcast-add.component.css']
})
export class PodcastAddComponent {

  podcastForm: FormGroup;

  typePodcastOptions: string[] = Object.values(TypePod);

  constructor(private formBuilder : FormBuilder , private podcastService : PodcastService){
    this.podcastForm = this.formBuilder.group({
      audio: ['',Validators.required],
      titrePod: ['',Validators.required],
      typePod: [null,Validators.required]
    });
  }

  addPodcast(): void{
    if (this.podcastForm.valid){
      const newPodcast : Podcast = {...this.podcastForm.value};

      this.podcastService.addPodcast(newPodcast).subscribe(()=>{
        alert("Podcast Added");
        this.podcastForm.reset();
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
