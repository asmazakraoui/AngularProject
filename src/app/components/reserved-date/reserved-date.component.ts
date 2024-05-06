import { Component } from '@angular/core';
import { ReservedDateService } from 'src/app/Services/reserved-date.service';

@Component({
  selector: 'app-reserved-date',
  templateUrl: './reserved-date.component.html',
  styleUrls: ['./reserved-date.component.css']
})
export class ReservedDateComponent {
  selectedDate: string;
  userId: number = 1;

  constructor(private reservedDateService: ReservedDateService) {}

 
  
  addDate() {
    if (this.selectedDate && this.userId) {
      this.reservedDateService.addUnavailableDate(this.selectedDate, this.userId).subscribe(
        response => {
          console.log('Date added successfully!');
        },
        error => {
          console.error('Error adding date:', error);
        }
      );
    }
  }

  
 
}
