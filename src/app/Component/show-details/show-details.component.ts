import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/ShopManag/Product';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { ProductService } from 'src/app/Services/Product/product.service';
import { RatingService } from 'src/app/Services/Rating/rating.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent {

  @Output() addToCartClicked = new EventEmitter<number>();


  @Input() selectedProduct: any | null = null;
  modalOpen = false;
  productList: Product[] = [];
  @Output() close = new EventEmitter<void>();
  @Input() userId!: number;
  constructor(private modalService: NgbModal, private ratingService : RatingService, private productService : ProductService, private commandLineService : CommandLineService) { }


  getImageUrl(): string {
    return `http://localhost/Uploads/ProductImages/${this.selectedProduct.imageProduit}`;
  }
  
  addToCart(product: Product, userId: number): void {
    this.commandLineService.addToCart(product, userId)
      .subscribe(
        response => {
         
          console.log('Product added to cart:', response);
          alert("Product added to Cart!");
          // Traitez la réponse ou effectuez d'autres actions si nécessaire
        },
        error => {
          console.error('Error adding product to cart:', error);
          alert("Error!");
          // Gérez l'erreur ou affichez un message d'erreur à l'utilisateur
        }
      );
  }
  onClose() {
    this.close.emit();
  }

}
