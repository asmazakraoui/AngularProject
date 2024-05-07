import { Component } from '@angular/core';
import { Categorie, Product } from 'src/app/models/ShopManag/Product';
import { ProductService } from 'src/app/Services/Product/product.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-get-product-front',
  templateUrl: './get-product-front.component.html',
  styleUrls: ['./get-product-front.component.css']
})
export class GetProductFrontComponent {
  products: Product[] = [];
  minPrice: number = 0;
  maxPrice: number = 100;
  selectedCategories: Categorie[] = [];
  nomProduit!: string;
  categories: Categorie[] = Object.values(Categorie);
  totalItems!: number;
  pageSize = 6; 
  currentPage = 1; 
  totalPages!: number;
  pages: number[] = [];
  pagedProducts: Product[] = [];

  constructor(private productService: ProductService, private config: NgbPaginationConfig) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.getProducts();
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

  getProducts(): void {
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

  searchProduct(): void {
    this.productService.searchProduct(this.nomProduit).subscribe(products => {
      this.products = products;
      this.totalItems = this.products.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedProducts();
    });
  }

  filterProducts(): void {
    this.productService.filterProducts(this.minPrice, this.maxPrice, this.selectedCategories).subscribe(products => {
      this.products = products;
      this.totalItems = this.products.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePagedProducts();
    });
  }

  toggleCategorySelection(category: string): void {
    const categorie: Categorie = category as Categorie;
    const index = this.selectedCategories.indexOf(categorie);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categorie);
    }
  }

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
  
}
