import { Component, OnInit } from '@angular/core';
import { EventService } from '../ServiseEvent/event.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-event-stat',
  templateUrl: './event-stat.component.html',
  styleUrls: ['./event-stat.component.css']
})
export class EventStatComponent   {
   
//   public barChartOptions: any = {
//     responsive: true
//   };
//   public barChartLabels: string[] = [];
//   public barChartType: string = 'bar';
//   public barChartLegend: boolean = true;
//   public barChartData: any[] = [];

//   constructor(private eventService: EventService) { }

//   ngOnInit(): void {
//     this.eventService.getAllEvent().subscribe((events: Event[]) => {
//       this.barChartLabels = events.map(event => event.titreEvent);
//       this.barChartData = [{ data: events.map(event => event.nrParticipants), label: 'Number of Participants' }];
//     });
//   }
// }

}
