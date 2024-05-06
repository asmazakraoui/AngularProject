import { Component } from '@angular/core';
import { CalendarService } from '../../Services/calendar-patient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarPatientComponent {
  viewDate: Date = new Date();
  userId = 1;
  constructor(
    private calendarService: CalendarService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('userId:', this.userId);
  }

  dayClicked({ date }: { date: Date }): void {
    this.calendarService.saveDate(date, this.userId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/patient-dashboard'], { queryParams: { date: date.toISOString() } });
    });
  }

  monthSelected({ date }: { date: Date }): void {
    this.viewDate = date;
  }
}
