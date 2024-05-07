import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Promotion } from 'src/app/models/ShopManag/Promotion';
import { PromotionService } from 'src/app/Services/Promotion/promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-promotion',
  templateUrl: './update-promotion.component.html',
  styleUrls: ['./update-promotion.component.css']
})
export class UpdatePromotionComponent implements OnInit{
  promotions: Promotion[] = [];
  @Output() close = new EventEmitter<void>();
  @Input() promotionIdToUpdate: any | undefined;
  modalRef: NgbModalRef | undefined;
  promotionForm!: FormGroup;
  constructor(private modalService: NgbModal,private promotionService: PromotionService,private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.promotionForm = this.formBuilder.group({
      code: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });
    this.getPromotionById();
  }

  getPromotionById() {
    this.promotionService.getPromotionById(this.promotionIdToUpdate).subscribe((res) => {
      this.promotionForm.patchValue(res);
    });
  }

  onClose() {
    this.close.emit();
  }

  updatePromotion(): void {
    this.promotionService.updatePromotion(this.promotionIdToUpdate, this.promotionForm.value).subscribe(() => {
      console.log(this.promotionForm);
      Swal.fire('Hello!', 'Promotion updated!', 'success');
      this.promotionForm.reset();
      this.close.emit();
    });
  }

}
