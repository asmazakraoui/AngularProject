import { Component, OnInit } from '@angular/core';
import { CommandLine } from 'src/app/Models/ShopManag/CommandLine';
import { Orderr } from 'src/app/Models/ShopManag/Orderr';
import { Product } from 'src/app/Models/ShopManag/Product';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { OrderrService } from 'src/app/Services/Orderr/orderr.service';

@Component({
  selector: 'app-order-back',
  templateUrl: './order-back.component.html',
  styleUrls: ['./order-back.component.css']
})
export class OrderBackComponent implements OnInit{
  orders: Orderr[] = [];
  commandLines: CommandLine[] = [];
  selectedCommandLine: CommandLine[] = [];
  product!: Product;
  etat:boolean=false;
  totalItems!: number;
  pageSize = 9; 
  currentPage = 1; 
  totalPages!: number;
  pages: number[] = [];
  commandLine!:CommandLine;
  pagedOrders: Orderr[] = [];
  products: Product[] = [];

  constructor(private orderService: OrderrService, private commandLineService: CommandLineService) {}

  ngOnInit(): void {
    this.getAllOrders();
    //this.getProductDetails(this.commandLine.idLigneCom);
  }

  getAllOrders(): void {
    this.orderService.findAllOrderrs()
      .subscribe((res) => {
        this.orders = res;
        this.totalItems = this.orders.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedOrders();
      },
      (error) => {
        console.error('Error retrieving products:', error);
        
      }
    );
  }

  loadCommandLines(idOrder: number): void {
    this.orderService.getCommandLinesByOrder(idOrder).subscribe(
      (data: CommandLine[]) => {
        this.commandLines = data;
        console.log(data);
      },
      error => {
        console.log('Erreur lors du chargement des lignes de commande :', error);
      }
    );
  }

  closeModal(): void {
    this.etat=false;
  }

  openModal(order: Orderr): void {
    this.etat = true; 
  }

  getProductDetails(idLigneCom: number): void {
    console.log(idLigneCom);
    console.log("heeeeyyyyyyyyyyyyyyy product");
    this.commandLineService.getProductByCommandLine(idLigneCom)
      .subscribe(
        product => {
          this.product = product;
          console.log(this.product);
        },
        error => {
          console.log('Erreur lors de la récupération du produit :', error);
        }
      );
  }


  getImageUrl(imageProduit: string | undefined): string {
    if (imageProduit) {
        return `http://localhost/Uploads/ProductImages/${imageProduit}`;
    } else {
        return ''; 
    }
}


  getCurrentPageOrders(): Orderr[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.orders.slice(startIndex, endIndex);
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
    this.pagedOrders = this.orders.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOrders();
    }
  }

  getOrdersSortedByDateAsc(): void {
    this.orderService.getAllOrdersSortedByDateAsc()
      .subscribe(orders => {
      this.orders = orders;
      this.totalItems = this.orders.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedOrders();
    });
  }

  getOrdersSortedByDateDesc(): void {
    this.orderService.getAllOrdersSortedByDateDesc()
      .subscribe(orders => {
        this.orders = orders;
        this.totalItems = this.orders.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedOrders();
      });
  }

}