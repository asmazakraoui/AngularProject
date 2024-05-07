import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/Services/Product/product.service';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DeliveryService } from 'src/app/Services/Delivery/delivery.service';


@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css']
})
export class DashboardProductComponent {
  

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Product Count' }
  ];
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public pieChartColors: any[] = [
    {
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0', '#FF9F40']
    }
  ];

  constructor(private productService: ProductService, private deliveryService: DeliveryService) { }

  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false // Permet d'agrandir ou de réduire le graphique en fonction de la taille du conteneur
  };

  ngOnInit(): void {
    this.productService.getCategoryStats().subscribe((data: { [key: string]: number }) => {
      
      this.barChartLabels = Object.keys(data);
      this.barChartData[0].data = Object.values(data);
    });
    this.deliveryService.getDeliveryStatsByGovernorate().subscribe(
      (data: any) => {
        this.pieChartLabels = Object.keys(data);
        this.pieChartData = Object.values(data);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  
  }

 /* getDeliveryStatsByGovernorate(): void {
    this.deliveryService.getDeliveryStatsByGovernorate().subscribe(
      (data: any) => {
        this.chartData = {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ]
          }]
        };
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques de livraison par gouvernorat :', error);
      }
    );
  }*/
}