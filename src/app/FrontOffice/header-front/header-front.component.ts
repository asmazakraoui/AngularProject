import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobApplicationService } from 'src/app/Services/job-application.service';
import { RegisterService } from 'src/app/Services/register.service';
import { JobAppComponent } from 'src/app/job-app/job-app.component';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {

  showApplyModal: boolean = false;

  constructor(private jobApplicationService: JobApplicationService,private router:Router,
    private registerService:RegisterService,private modalService: NgbModal) { }
    


  openJobApplicationModal() {

    this.showApplyModal = true;
    console.log(this.showApplyModal);
  }

  closeJobApplicationModal() {
    this.showApplyModal = false;

  }

}
