import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobApplicationService } from 'src/app/Services/job-application.service';
import { RegisterService } from 'src/app/Services/register.service';
import { JobAppComponent } from 'src/app/job-app/job-app.component';

@Component({
  selector: 'app-dash-front',
  templateUrl: './dash-front.component.html',
  styleUrls: ['./dash-front.component.css']
})
export class DashFrontComponent {
 
  constructor(private jobApplicationService: JobApplicationService,private router:Router,
    private registerService:RegisterService,private modalService: NgbModal){}

  

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
