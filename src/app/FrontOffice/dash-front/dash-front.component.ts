import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-dash-front',
  templateUrl: './dash-front.component.html',
  styleUrls: ['./dash-front.component.css']
})
export class DashFrontComponent {
  
  constructor(private router:Router,private registerService:RegisterService){}

  

  logout(): void {
    this.registerService.logout().subscribe(
      (response) => {
        console.log('Logout successful:', response);
        this.router.navigate(['/login']);
        localStorage.removeItem('user'); 
        localStorage.removeItem('token'); 


      },
      (error) => {
        console.error('Logout failed:', error);
        // Handle error if logout fails
      }
    );
  }
  
  



}
