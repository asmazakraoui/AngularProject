import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/ShopManag/Product';
import { ProductService } from 'src/app/Services/Product/product.service';
import { CardProductFrontComponent } from '../card-product-front/card-product-front.component';
import { CommandLineService } from 'src/app/Services/CommandLine/command-line.service';
import { ProductInfo } from 'src/app/models/ShopManag/ProductInfo';
import { Observable } from 'rxjs';
import { OrderrService } from 'src/app/Services/Orderr/orderr.service';
import { PromotionService } from 'src/app/Services/Promotion/promotion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetProductFrontComponent } from '../get-product-front/get-product-front.component';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit{
  etat: boolean = false; // Initialisez l'état du panier à false par défaut
  cartProducts: ProductInfo[] = [];
  userId: number = 2;
  code: string = '';
  total: number = 0;
  discount: number = 0;
  promotionForm: FormGroup;
  products: Product[] = [];
  selectedProduct: any | null = null;
  totalItems!: number;
  pageSize = 6;
  currentPage = 1; 
  totalPages!: number;
  pages: number[] = [];
  pagedProducts: Product[] = [];

  constructor(private cartService: CommandLineService, 
              private orderrService: OrderrService, 
              private promotionService: PromotionService,
              private formBuilder: FormBuilder,
              private productService: ProductService, 
              private commandLineService : CommandLineService, 
              private router: Router) { 
    this.promotionForm = this.formBuilder.group({ 
      code: ['', Validators.required] 
    });
  }
  ngOnInit(): void {
    this.getCartProducts();
    this.getProducts();
    this.loadHighRatedProducts();
  }

  getProducts(): void {
    this.productService.findAllProducts().subscribe(products => {
      this.products = products;
      this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
    });
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

  getCartProducts(): void {
    this.cartService.getCart(this.userId).subscribe(products => {
        this.cartProducts = products;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
      this.updateCartState(); 
    });
  }

  updateCartState(): void {
    this.etat = this.cartProducts.length > 0; 
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce((total, product) => total + product.totalPrice, 0);
  }

  calculateDiscount() {
    this.code = this.promotionForm.get('code')?.value;
    this.total = this.getTotalPrice(); 
    console.log(this.code);
    console.log(this.total);

    this.promotionService.Discount(this.code, this.total).subscribe({
      next: (discount: number) => {
        console.log("calcul");
        this.discount = discount; 
      },
      error: (error: any) => {
        console.error('Error calculating discount:', error);
      }
    });
  }
  getImageUrl(product:Product): string {
    return `http://localhost/Uploads/ProductImages/${product.imageProduit}`;
  }

  placeOrder(): void {
    const total = this.getTotalPrice()-this.discount;
    console.log(total);
    this.orderrService.placeOrderr(total, this.discount, this.code)
      .subscribe(
        response => {
          console.log('Order placed successfully', response);
          this.router.navigate(['/pay-carte']);
        },
        error => {
          console.error('Error placing order', error);
        }
      );
  }
  getProductsSortedByPriceAsc(): void {
    this.commandLineService.getProductsSortedByPriceAsc()
      .subscribe(products => {
        this.cartProducts = products;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
      } );
  }

  getProductsSortedByPriceDesc(): void {
    this.commandLineService.getProductsSortedByPriceDesc()
      .subscribe(products =>{
        this.cartProducts = products;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
      } );
  }

  getCurrentPageProducts(): ProductInfo[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.cartProducts.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedProducts();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagedProducts();
    }
  }
  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProducts();
    }
  }

  loadHighRatedProducts(): void {
    this.productService.getProductsByHigherAverageRating().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log('Error fetching high-rated products:', error);
      }
    );
  }

}
