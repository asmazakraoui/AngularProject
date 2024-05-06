import { Component, OnInit } from '@angular/core';
import { Orderr } from 'src/app/Models/ShopManag/Orderr';
import { OrderrService } from 'src/app/Services/Orderr/orderr.service';

@Component({
  selector: 'app-orderr',
  templateUrl: './orderr.component.html',
  styleUrls: ['./orderr.component.css']
})
export class OrderrComponent implements OnInit{
  orderrs: Orderr[] = [];
  constructor(private orderrService: OrderrService) { }

  ngOnInit(): void {
    this.loadOrderrs();
  }

  loadOrderrs(): void {
    this.orderrService.findAllOrderrs().subscribe(orderrs => {
      this.orderrs = orderrs;
    });
  }

  deleteOrderr(id:number): void {
    this.orderrService.deleteOrderr(id).subscribe(() : void => {
      this.loadOrderrs();
    });
  }
}
