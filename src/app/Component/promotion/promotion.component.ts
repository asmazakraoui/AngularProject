import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Promotion } from 'src/app/models/ShopManag/Promotion';
import { PromotionService } from 'src/app/Services/Promotion/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit{

 
  promotions: Promotion[] = [];
  @Input() promotion!: Promotion ;
  promotionForm: FormGroup;
  etat: boolean = false;
  showAddPromotionModal: boolean = false;
  showUpdatePromotionModal: boolean = false;
  public promotionIdToUpdate! : number;

  constructor(private modalService: NgbModal,private promotionService: PromotionService,private formBuilder: FormBuilder,) {
    this.promotionForm = this.formBuilder.group({
      code: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }
  @Output() promotionAdded = new EventEmitter<Promotion>();
  /*newPromotion: Omit<Promotion, 'idPromotion'> = { // Omettre 'idPromotion' du type Promotion
    code: '',
    discountPercentage: 0,
    expirationDate: new Date(),
};*/

  modalRef: NgbModalRef | undefined;
  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.promotionService.findAllPromotions().subscribe(promotions => {
      this.promotions = promotions;
    });
  }
  openModal(content: any) {
    this.modalRef = this.modalService.open(content, { centered: true });
    this.etat=true;
}

closeModal() {
    this.modalRef?.close();
}

addPromotion() {
  if (this.promotionForm.valid){
    this.promotionService.addPromotion(this.promotion).subscribe(() => {
      alert("Product added successfully!");
      this.promotionForm.reset();

    }, error => {
      alert("An error occurred while adding Product.");
      console.error(error);
    });
  }

}

deletePromotion(id:number): void {
  this.promotionService.deletePromotion(id).subscribe(() : void => {
    this.loadPromotions();
  });
}
openAddPromotionModal() {
  this.showAddPromotionModal = true;

}

closeAddPromotionModal() {
  this.showAddPromotionModal = false;
}
openUpdatePromotionModal(id:number) {
  this.showUpdatePromotionModal = true;
  this.promotionIdToUpdate=id;
}

closeUpdatePromotionModal() {
  this.showUpdatePromotionModal = false;

}
}
