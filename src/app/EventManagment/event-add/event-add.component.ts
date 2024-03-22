import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, MeansTransport, TypeEvent } from 'src/app/models/event';
import { EventService } from '../ServiseEvent/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {

  eventForm: FormGroup;
  editingEvent : Event | null = null ;
  
  // Utilisation de l'énumération pour définir les options des sélecteurs
  typeEventOptions: string[] = Object.values(TypeEvent);
  MeansTransportOptions: string[] = Object.values(MeansTransport);

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
    this.eventForm = this.formBuilder.group({
      titreEvent: ['', Validators.required],
      dateEvent: ['', Validators.required],
      imageEvent: ['', Validators.required],
      nrParticipants: ['', Validators.required],
      nbTotalPlace: ['', Validators.required],
      adresseEvent: ['', Validators.required],
      typeEvent: [null, Validators.required],
      meansTransport: [null, Validators.required]
    });
  }

 addEvent(): void {
    if (this.eventForm.valid) {
      // Utilisation de spread operator pour copier les valeurs du formulaire dans un nouvel objet Event
      const newEvent : Event = { ...this.eventForm.value }; 

      this.eventService.addEvent(newEvent).subscribe(() =>{
          alert("Event Added!");
          this.eventForm.reset();
        },
        error => {
          alert("An error occurred while adding Event");
          console.error(error);
        }
      );
    } else {
      alert("Please fill in all the required fields");
    }
    
  }


 

  cancelEdit(): void {
    this.eventForm.reset();
  }
  

    }
  
