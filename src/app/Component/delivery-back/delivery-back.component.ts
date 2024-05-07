import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/models/ShopManag/Delivery';
import { DeliveryService } from 'src/app/Services/Delivery/delivery.service';

@Component({
  selector: 'app-delivery-back',
  templateUrl: './delivery-back.component.html',
  styleUrls: ['./delivery-back.component.css']
})
export class DeliveryBackComponent implements OnInit {

  deliveries: Delivery[] = [];
  totalItems!: number;
  pageSize = 5; 
  currentPage = 1; 
  totalPages!: number;
  pages: number[] = [];
  pagedDelivries: Delivery[] = [];
  searchDelivery!:string;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryService.getAllDeliveries()
    .subscribe((res) => {
      this.deliveries = res;
      this.totalItems = this.deliveries.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedOrders();
    },
    (error) => {
      console.error('Error retrieving products:', error);
      
    });
  }

  getCurrentPageDelivries(): Delivery[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.deliveries.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedOrders();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagedOrders();
    }
  }
  updatePagedOrders() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedDelivries = this.deliveries.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOrders();
    }
  }

  onSearch(): void {
    this.deliveryService.searchDeliveries(this.searchDelivery).subscribe((res) => {
      this.deliveries = res;
      this.totalItems = this.deliveries.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedOrders();
    },
    (error) => {
      console.error('Error retrieving products:', error);
      
    });
  }


}
