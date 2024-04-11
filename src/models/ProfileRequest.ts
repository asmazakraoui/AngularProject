import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export class ProfileRequest {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  adressUser: string;
  imageUser: string;
  religion: string;
  dateNaiss: Date;
  email :string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.mobileNumber = '';
    this.adressUser = '';
    this.imageUser = '';
    this.religion = '';
    this.email= '';
    this.dateNaiss = new Date(); // Initialize with current date or set as required
  }

  static buildForm(fb: FormBuilder): FormGroup {
    return fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      mobileNumber: ['', [Validators.pattern('\\d{8}'), Validators.maxLength(8)]],
      adressUser: ['', [Validators.maxLength(100)]], // Adjust max length as needed
      imageUser: [''],
      email: ['', [Validators.required, Validators.email]], // Add email validators

      religion: [''],
      dateNaiss: [''] // You may want to use a custom validator for date format validation
    });
  }
}
