import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { User } from 'src/models/user';
import { MedicamentService } from '../../Services/medicament.service';
import { Medicament } from '../../model/medicament';
import { CalendarService } from '../../Services/calendar-admin.service';
import { Calendar } from '../../model/calendarModel';


@Component({
  selector: 'app-dash-chart',
  templateUrl: './dash-chart.component.html',
  styleUrls: ['./dash-chart.component.css']
})
export class DashChartComponent implements OnInit {
  selectedUser: User;
  medicines: Medicament[];
  medicineCounts: Map<string, number>;
  chartOptions: any;
  chartInstance: any;
  calendars: Calendar[];

  constructor(
    private medicamentService: MedicamentService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.fetchMedicines();
    this.fetchCalendars();
    this.fetchCalendarStatus();
    
  }

  fetchMedicines() {
    this.medicamentService.getAllmedicines().subscribe((medicines) => {
      this.medicines = medicines.map(medicine => {
        return {
          ...medicine,
          imageUrl: `http://localhost/images/${medicine.imageMed}`
        };
      });
      this.createMedicineCountChart();
    });
  }

  createMedicineCountChart() {
    this.medicineCounts = new Map<string, number>();
    this.medicines.forEach(medicine => {
      const count = this.medicineCounts.get(medicine.nomMed) || 0;
      this.medicineCounts.set(medicine.nomMed, count + 1);
    });

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: '350px'
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        data: Array.from(this.medicineCounts.entries()).map(([medicine, count]) => ({
          x: medicine,
          y: count
        }))
      }],
      xaxis: {
        type: 'category',
      }
    };

    this.chartInstance = new ApexCharts(document.querySelector('#medicine-count-chart'), this.chartOptions);
    this.chartInstance.render();
  }

  fetchCalendars() {
    this.calendarService.getAllCalendars().subscribe((calendars) => {
      this.calendars = calendars;
      this.createCalendarCountChart();
    });
  }
  createCalendarCountChart() {
    const approvedCalendars = this.calendars.filter((calendar: Calendar) => calendar.status === 'APPROVED');
  
    // Create a map to store the count of approved calendars for each month
    const calendarCounts = new Map<string, number>();
    approvedCalendars.forEach((calendar: Calendar) => {
      const date = new Date(calendar.selectedDate);
      const month = date.toLocaleString('default', { month: 'long' });
      const count = calendarCounts.get(month) || 0;
      calendarCounts.set(month, count + 1);
    });
  
    // Create the chart options
    this.chartOptions = {
      chart: {
        type: 'pie',
        height: '350px'
      },
      labels: Array.from(calendarCounts.keys()),
      series: Array.from(calendarCounts.values()),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  
    this.chartInstance = new ApexCharts(document.querySelector('#calendar-count-chart'), this.chartOptions);
    this.chartInstance.render();
  }

  fetchCalendarStatus() {
    this.calendarService.getAllCalendars().subscribe((calendars) => {
      this.calendars = calendars;
      this.createCalendarStatusChart();
    });
  }

  createCalendarStatusChart() {
    // Create a map to store the count of calendars for each status
    const calendarCounts = new Map<string, number>();
    this.calendars.forEach((calendar: Calendar) => {
      const count = calendarCounts.get(calendar.status) || 0;
      calendarCounts.set(calendar.status, count + 1);
    });
  
    // Calculate the total number of calendars
    const totalCalendars = this.calendars.length;
  
    // Create an array to store the percentage of calendars for each status
    const series = Array.from(calendarCounts.values()).map((count: number) => {
      return (count / totalCalendars) * 100;
    });
  
    // Create the chart options
    this.chartOptions = {
      chart: {
        type: 'donut',
        height: '350px'
      },
      labels: Array.from(calendarCounts.keys()),
      series: series,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  
    // Render the chart
    this.chartInstance = new ApexCharts(document.querySelector('#calendar-status-chart'), this.chartOptions);
    this.chartInstance.render();
  }
    
  
  
  
    
}
