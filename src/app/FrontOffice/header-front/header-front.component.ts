import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JobApplicationService } from 'src/app/Services/job-application.service';
import { RegisterService } from 'src/app/Services/register.service';
import { JobAppComponent } from 'src/app/job-app/job-app.component';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent  {
  modalRef: NgbModalRef | undefined;

  showApplyModal: boolean = false;

  @ViewChild('firstInput') firstInput: ElementRef | undefined;

  constructor(private jobApplicationService: JobApplicationService,private router:Router,
    private registerService:RegisterService,private modalService: NgbModal,private dialog:MatDialog) { }

 

    openJobApplicationModal(): void {
      const dialogRef = this.dialog.open(JobAppComponent , {
        width: '80%', // Adjust the width as needed
        panelClass: 'job-application-dialog',
      });
    }

  
}
