import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/Models/ShopManag/Delivery';
import { DeliveryService } from 'src/app/Services/Delivery/delivery.service';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css']
})
export class DeliveryPageComponent implements OnInit {
  deliveries!: Delivery[];
  deliveriii!:Delivery[];

  constructor(private deliveryService: DeliveryService ) { }

  ngOnInit(): void {
    this.fetchDeliveries();
    this.getAllDeliveriesAccepted();
  }

  fetchDeliveries(): void {
    this.deliveryService.getDelivery().subscribe(
      (deliveries: Delivery[]) => {
        this.deliveries = deliveries;
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la récupération des livraisons :', error);
      }
    );
  }
  setDeliveryAccepted(idDelivery: number): void {
    this.deliveryService.setDeliveryAccepted(idDelivery,3)
      .subscribe(
        (delivery: Delivery) => {
          console.log('Delivery accepted:', delivery);
          this.fetchDeliveries();
          this.getAllDeliveriesAccepted();
        },
        (error: any) => {
          console.error('An error occurred while accepting delivery:', error);
        }
      );
  }
  getAllDeliveriesAccepted(): void {
    this.deliveryService.getAllDeliveriesAccepted()
      .subscribe(
        (deliveries: Delivery[]) => {
          this.deliveriii = deliveries;
        },
        (error: any) => {
          console.error('Une erreur est survenue lors de la récupération des livraisons :', error);
        }
      )

}

setDeliveryDone(deliveryId:number): void {
  if (!deliveryId) {
    console.error('ID de livraison invalide');
    return;
  }

  this.deliveryService.setDeliveryDone(deliveryId)
    .subscribe(
      (delivery: Delivery) => {
        console.log('Livraison marquée comme terminée:', delivery);
        this.fetchDeliveries();
        this.getAllDeliveriesAccepted();
      },
      (error: any) => {
        console.error('Une erreur est survenue lors de la mise à jour de la livraison:', error);
      }
    );
}}
