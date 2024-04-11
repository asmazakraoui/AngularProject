import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';

  constructor(private userService: UserService, private router: Router) { }

  resetPassword(): void {
    this.userService.resetPassword(this.email, this.code, this.newPassword).subscribe(
      (response) => {
        console.log('Password reset successfully:', response);
        this.router.navigate(['/login']); // Change '/login' to the desired route

      },
      (error) => {
        console.error('Error resetting password:', error);
      }
    );
  }

}
