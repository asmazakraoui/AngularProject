import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from '../ServiseEvent/event.service';
import { Event } from '../../models/event';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-eventfront-aff',
  templateUrl: './eventfront-aff.component.html',
  styleUrls: ['./eventfront-aff.component.css']
})
export class EventfrontAffComponent implements OnInit {
  events: Event[] = [];
  userId!: number;
  selectedEvent: Event | null = null;
  p: number = 1;
  itemsParPage: number = 6;
  totalEvent: any;
  modalOpen = false;
  amount: number = 0;
  titreEv!: string;

  constructor(private eventservice: EventService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEvents();
    
  }

  loadEvents(): void {
    this.eventservice.getEventsWithAvailablePlaces().subscribe(
      (events: Event[]) => {
        this.events = events
        this.totalEvent = events.length;
      }, (error) => {
        console.error('Error fetching events:', error)
      }
    )
  }

  getEventtByTitre(): void {
    this.eventservice.getEventByTitre(this.titreEv).subscribe(events => {
      this.events = events;
      });
  }

  getImageUrl(event: Event): string {
    return `http://localhost/Uploads/Images/${event.imageEvent}`;
  }

  closeModal() {
    this.selectedEvent = null;
  }

  openModal(event: Event) {
    this.selectedEvent = event; // Set the selected event
  }

  openEventDetail(event: Event): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: { event: event } // Pass event details to dialog component
    });
  }

  
  getUserIdFromLocalStorage(): number {
    const id = localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0;
  }

  assignEventToUser(eventId: number): void {
    const userId = this.getUserIdFromLocalStorage();
    if (this.userId !== 0) {
      this.eventservice.assignEventToUser(eventId, userId).subscribe(
        (response) => {
          console.log(response); // Handle response of the request
          // Reload events after assignment
          this.loadEvents();
        },
        (error) => {
          console.error(error); // Handle errors
        }
      );
    } else {
      console.error('User ID not found.');
    }
  }

  searchEvents(keyword: string): void {
    if (keyword.trim()) {
      this.eventservice.searchEvents(keyword).subscribe(
        (events: Event[]) => {
          this.events = events;
          this.totalEvent = events.length;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.loadEvents(); // Load all events if keyword is empty
    }
  }

 
}






