import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent {

  email: string = '';
  code: string = '';
  newPassword: string = '';
  resetPasswordSent: boolean = false; // Flag to track if reset password code has been sent
  errorMessage: string = ''; // Variable to hold error message

  constructor(private userService: UserService,private router:Router) {}
 
  forgotPassword(): void {
    console.log('Sending reset code...');
    // Ensure 'email' parameter is included in the request
    this.userService.forgotPassword({ email: this.email })
      .subscribe(
        response => {
          console.log('Response:', response);
          this.resetPasswordSent = true;
          this.code = '';
          this.router.navigate(['/reset']); // Change '/login' to the desired route

        },
        error => {
          console.error(error);
        }
      );
  }
  
 
}
