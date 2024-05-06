import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-header-sec',
  templateUrl: './header-sec.component.html',
  styleUrls: ['./header-sec.component.css']
})
export class HeaderSecComponent {
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
