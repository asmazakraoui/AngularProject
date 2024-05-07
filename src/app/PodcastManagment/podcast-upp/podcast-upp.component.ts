import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePod } from 'src/app/models/podcast';
import { PodcastService } from '../ServicePodcast/podcast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { PodcastAddComponent } from '../podcast-add/podcast-add.component';
import { PodcastAffComponent } from '../podcast-aff/podcast-aff.component';

@Component({
  selector: 'app-podcast-upp',
  templateUrl: './podcast-upp.component.html',
  styleUrls: ['./podcast-upp.component.css']
})
export class PodcastUppComponent implements OnInit{

  podcastForm!: FormGroup;
  id: any;
  selectedFile: File | null = null;
  @Input() podcastIdToUpdate: number | undefined;
  @Output() close = new EventEmitter<void>();
  typePodcastOptions: string[] = Object.values(TypePod);


  constructor(private formBuilder: FormBuilder, private podcastService: PodcastService, private activatedRoute : ActivatedRoute, private router: Router, private podcastAffComponent :PodcastAffComponent ){}
  
  
  

  getPodcastById() {
    this.podcastService.getPodcastById(this.id).subscribe((res) => {
      console.log('Post data:', res);  // Vérifie la structure des données dans la console
      this.podcastForm.patchValue(res);
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.podcastForm= this.formBuilder.group({
      titrePod: ['',Validators.required],
      typePod: ['',Validators.required]
    });
    if (this.podcastIdToUpdate) {
      this.id = this.podcastIdToUpdate;
      this.getPodcastById();
    }}

    
    onFileSelected(podcast: any): void {
      this.selectedFile = podcast.target.files[0];
    }
  

  updatePodcast(): void {
    if(!this.selectedFile){
      alert("select file");
    }
    if (this.podcastForm.valid && this.selectedFile ) {
      const formData = new FormData();
      formData.append('audio', this.selectedFile);
      formData.append('titrePod', this.podcastForm.get('titrePod')?.value);
      formData.append('typePod', this.podcastForm.get('typePod')?.value);
      
      
      console.log(formData);
  
      this.podcastService.updatePodcast(this.id, formData).subscribe(() => {
        console.log("Podcast updated successfully!");
        alert("Podcast updated successfully!");
        this.podcastForm.reset();
        this.selectedFile= null;
        this.close.emit();
        this.podcastAffComponent.loadPodcasts();
      }, error => {
        console.error("An error occurred while updating Event:", error);
        alert("An error occurred while updating Event.");
      });
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  }
  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.selectedFile);
  //     reader.onload = () => {
  //       this.imageUrl = reader.result;
  //     };
  //   }
  // }

 

  onClose() {
    this.close.emit();
  }
  

}
