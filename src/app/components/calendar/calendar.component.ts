import { Component ,OnInit } from '@angular/core';
import { FuneralLocationService } from 'src/app/services/funeral-location.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent   implements OnInit {
  ceremonyDates: Date[] = [];
  locationId: number=4;

  constructor(private funeralservice: FuneralLocationService) { }

  ngOnInit(): void {
    // Supposons que vous ayez l'ID de l'emplacement de funérailles dynamiquement
    this.funeralservice.findCeremonyDatesByFuneralLocation(this.locationId).subscribe({
      next: (dates: Date[]) => {
        this.ceremonyDates = dates;
        console.log('Ceremony Dates:', this.ceremonyDates);
      },
      error: (error) => console.error('Error fetching ceremony dates:', error)
    });
  }
}