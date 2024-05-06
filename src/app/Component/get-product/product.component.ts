import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/ShopManag/Product';
import { ProductService } from 'src/app/Services/Product/product.service';
import {NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products: Product[] = [];
  @Input() product!: Product ;
  showAddProductModal: boolean = false;
  totalItems!: number;
  pageSize = 6; 
  currentPage = 1; 
  totalPages!: number;
  pages: number[] = [];
  pagedProducts: Product[] = [];

  constructor(private modalService: NgbModal,private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.findAllProducts().subscribe(
      (res) => {
        this.products = res;
        this.totalItems = this.products.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProducts();
      },
      (error) => {
        console.error('Error retrieving products:', error);
        
      }
    );
  }

  deleteProduct(id:number): void {
    this.productService.deleteProduct(id).subscribe(() : void => {
      this.loadProducts();
    });
  }
  getImageUrl(): string {
    return `http://localhost/Uploads/ProductImages/${this.product.imageProduit}`;
  }
  openAddProductModal() {
    this.showAddProductModal = true;
    console.log(this.showAddProductModal);
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
  }

  /*toggleCategorySelection(category: string): void {
    const categorie: Categorie = category as Categorie;
    const index = this.selectedCategories.indexOf(categorie);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categorie);
    }
  }*/

  sortProductsByPriceAscending(): void {
    this.productService.getProductsSortedByPriceAscending().subscribe(products => {
      this.products = products;
      this.totalItems = this.products.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedProducts();
    });
  }

  sortProductsByPriceDescending(): void {
    this.productService.getProductsSortedByPriceDescending().subscribe(products => {
      this.products = products;
      this.totalItems = this.products.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedProducts();
    });
  }

  getCurrentPageProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
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


}
