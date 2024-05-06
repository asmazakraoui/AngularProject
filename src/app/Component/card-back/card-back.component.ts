import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/ShopManag/Product';
import { ProductService } from 'src/app/Services/Product/product.service';
import { ProductComponent } from '../get-product/product.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.css']
})
export class CardBackComponent {
  @Input() product!: Product ;
  showUpdateProductModal: boolean = false;
  public productIdToUpdate! : number;

  constructor(private productService: ProductService, private productComponent: ProductComponent, private router: Router) { }

  getImageUrl(): string {
    /*const index = this.product.imageProduit.indexOf("C:/xampp/htdocs/Uploads/ProductImages/");
    var  url = this.product.imageProduit.substring(index);*/
    return `http://localhost/Uploads/ProductImages/${this.product.imageProduit}`;
  }

  deleteProduct(id:number): void {
    this.productService.deleteProduct(id).subscribe(() : void => {
      this.productComponent.loadProducts();
    });
  }

  openUpdateProductModal(productId: number) {
    this.productIdToUpdate = productId; // Enregistrer l'ID du produit à mettre à jour
    this.showUpdateProductModal = true;
}

  closeUpdateProductModal() {
    this.showUpdateProductModal = false;
  }


}
