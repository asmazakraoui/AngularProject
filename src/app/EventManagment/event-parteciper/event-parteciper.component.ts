import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from '../ServiseEvent/event.service';
import { ActivatedRoute } from '@angular/router';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { forkJoin } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event-parteciper',
  templateUrl: './event-parteciper.component.html',
  styleUrls: ['./event-parteciper.component.css']
})
export class EventParteciperComponent implements OnInit {
  events: Event[] = [];
  p: number = 1;
  itemsParPage: number = 6;
  totalEvent: any;
  amount: number = 0;
  modalOpen = false;
  selectedEvent: Event | null = null;
  event!: Event;

  constructor(private eventService: EventService, private activateRoute: ActivatedRoute , private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showEventsByUser();
    this.invokeStripe();
  }

  getImageUrl(event: Event): string {
    return `http://localhost/Uploads/Images/${event.imageEvent}`;
  }

  openEventDetail(event: Event): void {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      data: { event: event } // Pass event details to dialog component
    });
  }

  closeModal() {
    this.selectedEvent = null;
  }

  openModal(event: Event) {
    this.selectedEvent = event; // Set the selected event
  }


  showEventsByUser(): void {
    const userId = this.getUserIdFromLocalStorage();
    console.log ('this user',userId);
    if (userId) {
      this.eventService.getEventsByUser(userId).subscribe(
        (events: Event[]) => {
          this.events = events;
          console.log('Events for the user:', this.events);
        },
        (error) => {
          console.error('Error fetching events', error);
        }
      );
    }
  }

  getUserIdFromLocalStorage(): number {
    const id = localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0;
  }
  getEventToPay() {
    if (this.selectedEvent) {
      this.amount = this.selectedEvent.prixEvent;
    }
  }
  // removeEventFromUser(eventId: number): void {
  //   const userId = this.getUserIdFromLocalStorage();
  //   if (userId) {
  //     this.eventService.removeEventFromUser(eventId, userId).subscribe(
  //       response => {
  //         console.log('Event successfully removed from user');
  //         // Refresh the list of user events after removal
  //         this.showEventsByUser();
  //       },
  //       error => {
  //         console.error('An error occurred:', error);
  //       }
  //     );
  //   }
  // }

  removeEventFromUser(eventId: number): void {
    if (confirm("Are you sure you want to delete this Event?")){
    const userId = this.getUserIdFromLocalStorage();
    this.eventService.removeEventFromUser(eventId, userId).subscribe(
      (response: string) => {
        console.log('Event successfully removed from user:', response);
        // Mettez à jour l'affichage ou effectuez d'autres actions nécessaires
      },
      (error) => {
        console.error('An error occurred:', error);
        // Gérez l'erreur ici si nécessaire
      }
    );
  }
}


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }





Payment(): void {
  this.getEventToPay();
  console.log('Payment amount:', this.amount);
  const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51PD3ohP83rnq4XWrgngLsxlMojGDjstiuYG5xchVTsxcHjV7VhT9kUVWFZP2vwbmjEDijnmY1TaKV4yqnoPWK07h00uNcRMKlR',
      locale: 'auto',
      token: (stripeToken: any) => {
          console.log('stripe token:', stripeToken);
          this.generateInvoice();
      }
  });
  paymentHandler.open({
      name: 'Payment',
      description: 'Enter your bank card number',
      amount: this.amount * 100, // Amount in cents
  });
 
}

async generateInvoice(): Promise<void> {
  const clientName: string = "aymen askri"; // Assurez-vous que vous avez un champ pour le nom du client dans votre modèle de commande
  const orderDate: string = new Date().toLocaleDateString(); // Obtenez la date de la commande
  
  let invoiceContent = `
      Invoice
      --------
      
      Dear ${clientName},
      
      Thank you for participating in our event. We truly appreciate your presence.
      
      Date: ${orderDate}
      
      Terms:
      - Payment Terms:
        Participation in this event is free of charge.
      - Termination:
        This invoice is for acknowledgment purposes only.
      - Governing Law:
        This invoice shall be governed by and construed in accordance with the laws of your jurisdiction.
      
      Thank you once again for your participation!
      
      Sincerely,
      [Your Event Organization]
  `;

  console.log(invoiceContent); // Affichez la facture une fois qu'elle est générée
  await this.saveInvoiceAsPDF(invoiceContent);
}

async saveInvoiceAsPDF(contractData: string): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(contractData, {
      x: 50,
      y: page.getHeight() - 100,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Invoice.pdf';
  link.click();
  window.URL.revokeObjectURL(url);
}





}



  









