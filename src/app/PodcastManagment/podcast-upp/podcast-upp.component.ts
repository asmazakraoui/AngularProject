import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePod } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-podcast-upp',
  templateUrl: './podcast-upp.component.html',
  styleUrls: ['./podcast-upp.component.css']
})
export class PodcastUppComponent implements OnInit{

  podcastForm!: FormGroup;
  id: any;

  typePodcastOptions: string[] = Object.values(TypePod);

  constructor(private formBuilder: FormBuilder, private podcastService: PodcastService, private activatedRoute : ActivatedRoute ){}


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.podcastForm= this.formBuilder.group({
      audio: ['',Validators.required],
      titrePod: ['',Validators.required],
      typePod: [null,Validators.required]
    });
    // Charger les données du livre à modifier
    this.podcastService.getPodcastById(this.id).subscribe(
      (podca: any)=> {
        this.podcastForm.patchValue({
        audio: podca.audio,
        titrePod: podca.titrePod,
        typePod: podca.typePod
      }) 
    }
      
    )
  }
  /*
  getPodcastById(){
    this.podcastService.getPodcastById(this.id).subscribe((pod)=>{
      this.podcastForm.patchValue(pod);
    })
  }*/
  updatePodcast(): void {
    this.podcastService.updatePodcast(this.id, this.podcastForm.value).subscribe(()=>{
      alert("Podcast Updated ");
      this.podcastForm.reset();
    });
  }

}
