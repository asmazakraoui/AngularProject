import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../Services/register.service';
import { Router } from '@angular/router';
import { TypeRole } from 'src/models/role';
import { User } from 'src/models/user';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {
  userForm!: FormGroup;
  imageUrl: any;
  selectedImage: File | undefined;
  roleNamesPlaceholder: string = '';
  showCertificateUpload: boolean = false;
  certificateFile: File | undefined; // For storing certificate file object
currentUser:User;
  constructor(private userService: RegisterService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.roleNamesPlaceholder = this.getRoleNamesPlaceholder();

  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      adressUser: [''],
      etat: [false], // Default value for etat
      religion: ['Muslim'], // Default value for religion
      sexe: ['male'], // Default value for sexe
      dateNaiss: [''],
      roleNames: [[]],
      imageUser: [null] // Use null for imageUser
    });
  }

  getRoleNamesPlaceholder(): string {
    const roleNames = Object.values(TypeRole)
      .filter(value => typeof value === 'string')
      .map(value => value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' '))
      .join(', ');
    return `Enter role names (${roleNames})`;
  }
 



  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formData = this.userForm.value;
    formData.dateNaiss = new Date(formData.dateNaiss);
    formData.imageUser = this.selectedImage;

    this.userService.registerUser(
      formData.firstName,
      formData.lastName,
      formData.password,
      formData.mobileNumber,
      formData.email,
      formData.adressUser,
      formData.etat,
      formData.religion,
      formData.sexe,
      formData.dateNaiss,
      formData.roleNames,
      formData.imageUser
    ).subscribe(
      (user) => {
        console.log('User registered successfully:', user);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Failed to register user:', error);
        // Handle registration error
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}
