import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Promotion } from 'src/app/models/ShopManag/Promotion';
import { PromotionService } from 'src/app/Services/Promotion/promotion.service';
import { PromotionComponent } from '../promotion/promotion.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent {

  promotions: Promotion[] = [];
  @Input() promotion!: Promotion ;
  @Output() close = new EventEmitter<void>();
  modalRef: NgbModalRef | undefined;
  promotionForm: FormGroup;
  etat: boolean = false; 
  constructor(private promotionService: PromotionService,private formBuilder: FormBuilder, private promotionComponent: PromotionComponent) {
    this.promotionForm = this.formBuilder.group({
      code: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }
onClose() {
  this.close.emit();
}
closeModal() {
  this.modalRef?.close();
}

addPromotion(): void {
if (this.promotionForm.valid){
  const newPromotion: Promotion = this.promotionForm.value as Promotion;
  this.promotionService.addPromotion(newPromotion).subscribe(() => {
    Swal.fire('Hello!', 'Promotion added successfully!', 'success');
    this.promotionForm.reset();
    this.close.emit();
    this.promotionComponent.loadPromotions();
    

  }, error => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'An error occurred while adding Promotion.',
      footer: '<a href="#">Pourquoi cette erreur?</a>'
    });
    console.error(error);
  });
}else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please fill in all the required fields correctly',
    footer: '<a href="#">Pourquoi cette erreur?</a>'
  });
}

}

}
