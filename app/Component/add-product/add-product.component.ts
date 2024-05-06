import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie, Product, TypeShop } from 'src/app/Models/ShopManag/Product';
import { ProductService } from 'src/app/Services/Product/product.service';
import { Location } from '@angular/common';
import { NgbModalRef, NgbModal, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from '../get-product/product.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

 
  productForm: FormGroup;
  selectedFile: File | null = null;
  private modalRef: NgbModalRef | null = null;
  categorieOptions: string[] = Object.values(Categorie);
  typeShopOptions: string[] = Object.values(TypeShop);
  imageUrl: string | ArrayBuffer | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private location: Location, private modalService: NgbModal, private productComponent: ProductComponent) {
    this.productForm = this.formBuilder.group({
      nomProduit: ['', Validators.required],
      prixProduit: ['', [Validators.required, Validators.min(0)]],
      dateFabrication: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      nbrProduit: ['', [Validators.required, Validators.min(0)]],
      //typeShop: ['', [Validators.required]],
      widthProduct:['',Validators.required],
      heightProduct:['',Validators.required]
    });
  }

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

  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();

      // Ajouter le fichier sélectionné
      formData.append('file', this.selectedFile);

      // Vérifier si les valeurs ne sont pas null avant de les ajouter à FormData
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
        console.log(categorie);
      } else {
        console.error("One or more form values are null.");
        return;
      }

      this.productService.addProduct(formData).subscribe(() => {
        Swal.fire('Hello!', 'Product added successfully!', 'success');
        this.productForm.reset();
        this.close.emit();
        this.productComponent.loadProducts();
        this.selectedFile = null;
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while adding Product.',
          footer: '<a href="#">Pourquoi cette erreur?</a>'
        });
        console.error(error);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the required fields correctly and select an image.',
        footer: '<a href="#">Pourquoi cette erreur?</a>'
      });
    }
}

onClose() {
  this.close.emit();
}


  cancelEdit(): void {
    this.productForm.reset();
    this.selectedFile = null;
  }

  goBack(): void {
    this.location.back(); // Cette ligne permet de retourner à la page précédente dans l'historique du navigateur
  }
}
