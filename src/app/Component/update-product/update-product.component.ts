import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product/product.service';
import { Location } from '@angular/common';
import { Categorie, TypeShop } from 'src/app/models/ShopManag/Product';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ProductComponent } from '../get-product/product.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{

  productForm!: FormGroup;
  categorieOptions: string[] = Object.values(Categorie);
  typeShopOptions: string[] = Object.values(TypeShop);
  private modalRef: NgbModalRef | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() productIdToUpdate: any | undefined;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private productComponent:ProductComponent) {}

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      nomProduit: ['', Validators.required],
      prixProduit: ['', [Validators.required, Validators.min(0)]],
      dateFabrication: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      description: ['', Validators.required],
      nbrProduit: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', [Validators.required]],
      widthProduct:['',[Validators.required, Validators.min(0)]],
      heightProduct:['',[Validators.required, Validators.min(0)]]
    });
    this.getProductById();
  }

  getProductById() {
    this.productService.getProductById(this.productIdToUpdate).subscribe((res) => {
      this.productForm.patchValue(res);
    });
  }

  updateProduct(): void {
    
      const formData = new FormData();
      if (this.productForm.valid) { 
        if (!this.selectedFile) { 
          alert("Please select an image.");
           
          return;
        }
      formData.append('file', this.selectedFile);

      const nomProduit = this.productForm.get('nomProduit')?.value;
      const prixProduit = this.productForm.get('prixProduit')?.value;
      const dateFabrication = this.productForm.get('dateFabrication')?.value;
      const dateExpiration = this.productForm.get('dateExpiration')?.value;
      const description = this.productForm.get('description')?.value;
      const nbrProduit = this.productForm.get('nbrProduit')?.value;
      const categorie = this.productForm.get('categorie')?.value; 
      const typeShop = "Store";
      const widthProduct = this.productForm.get('widthProduct')?.value;
      const heightProduct = this.productForm.get('heightProduct')?.value;

      if (nomProduit !== null && prixProduit !== null && dateFabrication !== null &&
          dateExpiration !== null && description !== null && nbrProduit !== null && categorie!==null && typeShop!==null
          && widthProduct!==null && heightProduct!==null) {
        formData.append('nomProduit', nomProduit);
        formData.append('prixProduit', prixProduit);
        formData.append('dateFabrication', dateFabrication);
        formData.append('dateExpiration', dateExpiration);
        formData.append('description', description);
        formData.append('nbrProduit', nbrProduit);
        formData.append('categorie', categorie);
        formData.append('typeShop', typeShop);
        formData.append('widthProduct',widthProduct);
        formData.append('heightProduct',heightProduct);
        console.log(formData);
      } else {
        console.error("One or more form values are null.");
        return;
      }

      this.productService.updateProduct(this.productIdToUpdate,formData).subscribe(() => {
        console.log("update");
        Swal.fire('Hello!', 'Product updated successfully!', 'success');
        this.productForm.reset();
        this.close.emit();
        this.selectedFile = null;
        this.productComponent.loadProducts();
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while updating Product.',
          footer: '<a href="#">Pourquoi cette erreur?</a>'
        });
        console.error(error);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the required fields correctly.',
        footer: '<a href="#">Pourquoi cette erreur?</a>'
      });
    }
}
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  onClose() {
    this.close.emit();
  }

}