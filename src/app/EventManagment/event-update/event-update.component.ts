import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../ServiseEvent/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MeansTransport, TypeEvent } from 'src/app/models/event';
import { EventAffComponent } from '../event-aff/event-aff.component';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {

  eventForm!: FormGroup;
  id: any;
  selectedFile: File | null = null;

  @Input() eventIdToUpdate: any | undefined ;
  @Output() close = new EventEmitter<void>();

  typeEventOptions: string[] = Object.values(TypeEvent);
  meansTransportOptions: string[] = Object.values(MeansTransport);

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute , private router: Router, private eventAffComponent: EventAffComponent) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.eventForm = this.formBuilder.group({
      titreEvent: ['', Validators.required],
      dateEvent: ['', Validators.required],
      nrParticipants: ['', Validators.required],
      nbTotalPlace: ['', Validators.required],
      adresseEvent: ['', Validators.required],
      typeEvent: [null, Validators.required],
      meansTransport: [null, Validators.required],
      prixEvent: ['', Validators.required]
    });
    // Charger les données de l'événement à mettre à jour
    //this.getEventById();
    if (this.eventIdToUpdate) {
      this.id = this.eventIdToUpdate;
      this.getPostById();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }




  getPostById() {
    this.eventService.getEventById(this.id).subscribe((res) => {
      console.log('Post data:', res);  // Vérifie la structure des données dans la console
      this.eventForm.patchValue(res);
    });
  }
  

  updateEvent(): void {
    if (this.eventForm.valid && this.selectedFile ) {
      const formData = new FormData();
      formData.append('titreEvent', this.eventForm.get('titreEvent')?.value);
      formData.append('dateEvent', this.eventForm.get('dateEvent')?.value);
      formData.append('file', this.selectedFile);
      formData.append('nrParticipants', this.eventForm.get('nrParticipants')?.value);
      formData.append('nbTotalPlace', this.eventForm.get('nbTotalPlace')?.value);
      formData.append('adresseEvent', this.eventForm.get('adresseEvent')?.value);
      formData.append('typeEvent', this.eventForm.get('typeEvent')?.value);
      formData.append('meansTransport', this.eventForm.get('meansTransport')?.value);
      formData.append('prixEvent', this.eventForm.get('prixEvent')?.value);
      
      console.log(formData);
  
      this.eventService.updateEvent(this.id, formData).subscribe(() => {
        console.log("Event updated successfully!");
        alert("Event updated successfully!");
        this.eventForm.reset();
        this.selectedFile= null;
        this.close.emit();
        this.eventAffComponent.loadEvents();
      }, error => {
        console.error("An error occurred while updating Event:", error);
        alert("An error occurred while updating Event.");
      });
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  }

  onClose() {
    this.close.emit();
  }
  
}



