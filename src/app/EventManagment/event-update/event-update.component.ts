import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../ServiseEvent/event.service';
import { ActivatedRoute } from '@angular/router';
import { MeansTransport, TypeEvent } from 'src/app/models/event';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit{

  eventForm!: FormGroup;
  id: any;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private activatedRoute: ActivatedRoute ){}
  typeEventOptions: string[] = Object.values(TypeEvent);
  MeansTransportOptions: string[] = Object.values(MeansTransport);

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.eventForm= this.formBuilder.group({
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

  getEventById(){
    this.eventService.getEventById(this.id).subscribe((evv)=>{
      this.eventForm.patchValue(evv);
    })
  }

  updateEvent(): void {
    this.eventService.updateEvent(this.id, this.eventForm.value).subscribe(()=>{
      alert("Event updated!");
      this.eventForm.reset();
    });
  }



}
