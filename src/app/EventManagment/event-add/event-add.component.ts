import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, MeansTransport, TypeEvent } from 'src/app/models/event';
import { EventService } from '../ServiseEvent/event.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {
  
    events: Event[] = [];
  eventForm: FormGroup;
  selectedFile: File | null = null;
  siteKey:string = "6Le6P7wpAAAAABm999JF34z50hLi7BYFFHXBtaXS";
  // Utilisation de l'énumération pour définir les options des sélecteurs
  typeEventOptions: string[] = Object.values(TypeEvent);
  MeansTransportOptions: string[] = Object.values(MeansTransport);

  constructor( public dialogRef: MatDialogRef<EventAddComponent> , private formBuilder: FormBuilder, private eventService: EventService) {
    this.eventForm = this.formBuilder.group({
      titreEvent: ['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      dateEvent: ['', [Validators.required, this.dateValidator()]],
      nrParticipants: ['0', Validators.required],
      nbTotalPlace: ['',[Validators.required, Validators.min(1)]],
      adresseEvent: ['', Validators.required],
      typeEvent: [null, Validators.required],
      meansTransport: [null, Validators.required],
      prixEvent:[null,Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  dateValidator() {
    return (control: any) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        return { dateInvalid: true };
      }
      return null;
    };
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
  }

 
  
  addEvent(): void {
    if (this.eventForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      const titreEvent = this.eventForm.get('titreEvent')?.value;
      const dateEvent = this.eventForm.get('dateEvent')?.value;
      const nrParticipants = this.eventForm.get('nrParticipants')?.value;
      const nbTotalPlace = this.eventForm.get('nbTotalPlace')?.value;
      const adresseEvent = this.eventForm.get('adresseEvent')?.value;
      const typeEvent = this.eventForm.get('typeEvent')?.value;
      const meansTransport = this.eventForm.get('meansTransport')?.value;
      const prixEvent = this.eventForm.get('prixEvent')?.value;
      
      console.log('Form Values:');
      console.log('titreEvent:', titreEvent);
      console.log('dateEvent:', dateEvent);
      console.log('nrParticipants:', nrParticipants);
      console.log('nbTotalPlace:', nbTotalPlace);
      console.log('adresseEvent:', adresseEvent);
      console.log('typeEvent:', typeEvent);
      console.log('meansTransport:', meansTransport);
      console.log('prixEvent:', prixEvent);
      
      if (titreEvent && dateEvent && nrParticipants && nbTotalPlace && adresseEvent && typeEvent && meansTransport && prixEvent) {
        formData.append('titreEvent', titreEvent);
        formData.append('dateEvent', dateEvent);
        formData.append('nrParticipants', nrParticipants);
        formData.append('nbTotalPlace', nbTotalPlace);
        formData.append('adresseEvent', adresseEvent);
        formData.append('typeEvent', typeEvent);
        formData.append('meansTransport', meansTransport);
        formData.append('prixEvent', prixEvent);
        
        console.log('FormData:');
        console.log(formData);
        
        this.eventService.addEvent(formData).subscribe(() => {
          alert("Event added successfully!");
          this.eventForm.reset();
          this.selectedFile = null;
          this.loadEvents();
        },
        error => {
          alert("An error occurred while adding Event.");
          console.error(error);
        });
      } else {
        console.error("One or more form values are null.");
        return;
      }
    } else {
      // Error handling for form validation and file selection
    }
  }
  

  onlyZeroValidator() {
    return (control: any) => {
      const value = control.value;
      if (value !== 0) {
        return { onlyZero: true };
      }
      return null;
    };
  }
  


  loadEvents(): void {
    this.eventService.getAllEvent().subscribe(
      (events: Event[]) => {
        this.events= events
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
      
    );
  }
  
  onCancel() {
    this.dialogRef.close();
    
  }
  
}

  
 

 



    
  
