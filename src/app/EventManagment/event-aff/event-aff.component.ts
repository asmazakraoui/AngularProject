import { Component, OnInit } from '@angular/core';
import { EventService } from '../ServiseEvent/event.service';
import { Event } from 'src/app/models/event';
import { MatDialog } from '@angular/material/dialog';
import { EventAddComponent } from '../event-add/event-add.component';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event-aff',
  templateUrl: './event-aff.component.html',
  styleUrls: ['./event-aff.component.css']
})
export class EventAffComponent implements OnInit {
  events: Event[] = [];
  p:number = 1 ;  
  itemsParPage: number = 6 ;
  totalEvent: any ; 
  titreEv!: string;
  showUpdateEventModal: boolean = false;
  eventIdToUpdate!: number;

  constructor( private eventservice : EventService , private dialog: MatDialog){}
  
 
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventservice.getAllEvent().subscribe(
      (events: Event[]) => {
        this.events = events
        this.totalEvent = events.length;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
      
    );
  }
    


  getImageUrl(event: Event): string {
    return `http://localhost/Uploads/Images/${event.imageEvent}`;
  }
  

  
  deleteEvent(id:number): void {
    if (confirm("Are you sure you want to delete this Event?")){
    this.eventservice.deleteEvent(id).subscribe(() : void => {
      this.loadEvents();
    });
  }
  }
  
  openAddEvent(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(EventAddComponent , {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        empcode: code
      },
      panelClass: 'center-dialog'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadEvents();
      }
    });
  }

  openUpdateEvent(podID:number){
    this.eventIdToUpdate = podID;
    this.showUpdateEventModal = true;
  }

  closeUpdatePodcastModal(){
    this.showUpdateEventModal= false;
  }

  openEventDetail(eventtt: Event): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
     // width: '1000px', // Définissez la largeur du popup selon vos besoins
     // height: '300px', // Modifier la hauteur selon vos besoins
      data: { event: eventtt } // Transmettez les détails de l'événement au composant de dialogue
    });
  }

 
  deleteEventwhithRelation(id: number): void {
    if (confirm("Are you sure you want to delete this Event?")) {
      this.eventservice.deleteEventFromUser(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  searchEvents(keyword: string): void {
    if (keyword.trim()) {
      this.eventservice.searchEventBack(keyword).subscribe(
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

  



