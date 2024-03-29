import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, MeansTransport, TypeEvent } from 'src/app/models/event';
import { EventService } from '../ServiseEvent/event.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {


  eventForm: FormGroup;
  selectedFile: File | null = null;
  
  // Utilisation de l'énumération pour définir les options des sélecteurs
  typeEventOptions: string[] = Object.values(TypeEvent);
  MeansTransportOptions: string[] = Object.values(MeansTransport);

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
    this.eventForm = this.formBuilder.group({
      titreEvent: ['', Validators.required],
      dateEvent: ['', Validators.required],
      nrParticipants: ['', Validators.required],
      nbTotalPlace: ['', Validators.required],
      adresseEvent: ['', Validators.required],
      typeEvent: [null, Validators.required],
      meansTransport: [null, Validators.required]
    });
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
  }

  
  addEvent(): void {
    if (this.eventForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile); // Utilisation du nom de clé 'file' pour l'image
  
      const titreEvent = this.eventForm.get('titreEvent')?.value;
      const dateEvent = this.eventForm.get('dateEvent')?.value;
      const nrParticipants = this.eventForm.get('nrParticipants')?.value;
      const nbTotalPlace = this.eventForm.get('nbTotalPlace')?.value;
      const adresseEvent = this.eventForm.get('adresseEvent')?.value;
      const typeEvent = this.eventForm.get('typeEvent')?.value;
      const meansTransport = this.eventForm.get('meansTransport')?.value;
  
      if (titreEvent && dateEvent && nrParticipants && nbTotalPlace && adresseEvent && typeEvent && meansTransport) {
        formData.append('titreEvent', titreEvent);
        formData.append('dateEvent', dateEvent);
        formData.append('nrParticipants', nrParticipants);
        formData.append('nbTotalPlace', nbTotalPlace);
        formData.append('adresseEvent', adresseEvent);
        formData.append('typeEvent', typeEvent);
        formData.append('meansTransport', meansTransport);
      } else {
        console.error("One or more form values are null.");
        return;
      }
  
      this.eventService.addEvent(formData).subscribe(() => {
        alert("Event added successfully!");
        this.eventForm.reset();
        this.selectedFile = null;
      },
      error => {
        alert("An error occurred while adding Event.");
        console.error(error);
      });
    } else {
      alert("Please fill in all the required fields correctly and select an image.");
    }
  }
  
 
  
 

 

  cancelEdit(): void {
    this.eventForm.reset();
    this.selectedFile = null;
  }
  

    }
  
