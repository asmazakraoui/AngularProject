import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-nav-back',
  templateUrl: './nav-back.component.html',
  styleUrls: ['./nav-back.component.css']
})
export class NavBackComponent {


  constructor(private router:Router,private registerService:RegisterService,private renderer: Renderer2){}



  logout(): void {
    this.registerService.logout().subscribe(
      (response) => {
        console.log('Logout successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
        // Handle error if logout fails
      }
    );
  }

}
