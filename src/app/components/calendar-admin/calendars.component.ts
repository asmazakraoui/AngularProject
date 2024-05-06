import { Component, OnInit } from '@angular/core';
import { Calendar } from 'src/app/model/calendarModel';
import { CalendarService } from 'src/app/Services/calendar-admin.service';
import { Status } from 'src/app/model/statusModel';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarsComponent implements OnInit {
  calendars: any[] = [];
  newCalendar: any = {};
  editingCalendar: any = null;
  Status = Status;
  totalPages: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 4;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getCalendarsList();
  }

  getCalendarsList(): void {
    this.calendarService.getAllCalendars().subscribe(
      data => {
        this.calendars = data;
        this.totalItems = this.calendars.length;
        this.updateTotalPages();
        console.log(this.calendars);
      },
      error => {
        console.error('Error fetching calendars:', error);
      }
    );
  }

  getPagedData(calendars: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return calendars.slice(startIndex, startIndex + this.itemsPerPage);
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  changeStatus(calendarId: number, newStatus: Status): void {
    this.calendarService.changeStatus(calendarId, newStatus).subscribe(
      updatedCalendar => {
        console.log('Calendar updated successfully:', updatedCalendar);
        this.updateLocalCalendarList(updatedCalendar);
      },
      error => {
        console.error('Error updating calendar:', error);
      }
    );
  }

  updateLocalCalendarList(updatedCalendar: any): void {
    const index = this.calendars.findIndex(calendar => calendar.id === updatedCalendar.id);
    if (index !== -1) {
      this.calendars[index] = updatedCalendar;
    }
  }
}
