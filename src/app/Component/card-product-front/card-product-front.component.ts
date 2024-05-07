import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/ShopManag/Product';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/Services/Product/product.service';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { Rating } from 'src/app/models/ShopManag/Rating';
import { RatingService } from 'src/app/Services/Rating/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-product-front',
  templateUrl: './card-product-front.component.html',
  styleUrls: ['./card-product-front.component.css']
})
export class CardProductFrontComponent implements OnInit{
  @Input() product!: Product;
  @Output() addToCartClicked = new EventEmitter<number>();

  selectedStars: number = 0;
  selectedProduct: any | null = null;
  modalOpen = false;
  productList: Product[] = [];
  rating!:Rating;
  @Input() userId!: number;
  averageRating!:number;
  userRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(private modalService: NgbModal, private ratingService : RatingService, private productService : ProductService, private commandLineService : CommandLineService) { }

  ngOnInit() {
   this.loadAverageRating();
  }
  getStarsArray() {
    this.ratingService.getAverageRatingForProduct(this.product.idProduit).subscribe(
      (averageRating: number) => {
        this.averageRating = averageRating;
        console.log(this.averageRating);
      },
      (error: any) => {
        console.error('Une erreur s\'est produite :', error);
      }
    );
  }

  getImageUrl(): string {
    return `http://localhost/Uploads/ProductImages/${this.product.imageProduit}`;
  }
  closeModal() {
    this.selectedProduct = null;
  }
 openModal(productt : Product) {
    this.selectedProduct = productt; 
  }

  addToCart(product: Product, userId: number): void {
    this.commandLineService.addToCart(product, userId)
      .subscribe(
        response => {

          console.log('Product added to cart:', response);
          Swal.fire('Hello!', 'Product added to Cart!', 'success');
        },
        error => {
          console.error('Error adding product to cart:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error!',
            footer: '<a href="#">Pourquoi cette erreur?</a>'
          });
        }
      );
  }
  rateProduct(productId: number, stars: number): void {
    this.selectedStars = stars;
    this.ratingService.rateProduct(productId, 2, stars)
      .subscribe(
        response => {
          console.log('Rating successful:', response);
          // Traitez la réponse ou effectuez d'autres actions si nécessaire
        },
        error => {
          console.error('Error rating product:', error);
          // Gérez l'erreur ou affichez un message d'erreur à l'utilisateur
        }
      );
  }

  loadAverageRating() {
    this.productService.getAverageRating(this.product.idProduit)
      .subscribe(data => {
        this.averageRating = data;
      }, error => {
        console.log('Error fetching average rating:', error);
      });
  }
}
