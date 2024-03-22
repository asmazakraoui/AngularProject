import { Component, OnInit } from '@angular/core';
import { EventService } from '../ServiseEvent/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-aff',
  templateUrl: './event-aff.component.html',
  styleUrls: ['./event-aff.component.css']
})
export class EventAffComponent implements OnInit {
  events: Event[] = [];
  

  constructor( private eventservice : EventService){}
  
 
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventservice.getAllEvent().subscribe(
      (events: Event[]) => {
        this.events = events
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  
  deleteEvent(id:number): void {
    this.eventservice.deleteEvent(id).subscribe(() : void => {
      this.loadEvents();
    });
  }

}
