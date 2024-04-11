import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {

  constructor(private router: Router, 
  private registerService: RegisterService) { }
  user: any = {};
  loginUser() {
    this.registerService.login(this.user.email, this.user.password).subscribe(
      response => {
        console.log('User logged in successfully!', response);
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Login failed:', error);
        // Handle error response
      }
    );
  }

}
