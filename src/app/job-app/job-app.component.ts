
//import { Component, EventEmitter, Output } from '@angular/core';
import { JobApplicationService } from '../Services/job-application.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-job-app',
  templateUrl: './job-app.component.html',
  styleUrls: ['./job-app.component.css']
})
export class JobAppComponent {
  formData = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    adressUser: '',
    dateNaiss: '',
    sexe: '',
    certificateFile: null,
    cvFile: null
  };
  private modalRef: NgbModalRef | null = null;
  @Output() close = new EventEmitter<void>();
  constructor(private jobApplicationService: JobApplicationService,private dialogRef:MatDialogRef<JobAppComponent>) { }
  submitJobApplication() {
    const formData = new FormData();
    
    formData.append('firstName', this.formData.firstName);
    formData.append('lastName', this.formData.lastName);
    formData.append('mobileNumber', this.formData.mobileNumber);
    formData.append('email', this.formData.email);
    formData.append('address', this.formData.adressUser);
    formData.append('dateNaiss', this.formData.dateNaiss);
    formData.append('sexe', this.formData.sexe);
    formData.append('certificateFile', this.formData.certificateFile);
    formData.append('cvFile', this.formData.cvFile);
  
    this.jobApplicationService.applyForJob(formData).subscribe(
      response => {
        console.log('Job application submitted successfully:', response);
        this.showSuccessNotification('Job application submitted successfully:');
        this.onFileSelected=null;

        this.resetFormData();
        this.close.emit();
      },
      error => {
        console.error('Error submitting job application:', error);
  
        if (error && error.error) {
          console.error('Error Code:', error.status);
          console.error('Message:', error.error);
        } else {
          console.error('Unknown Error:', error);
        }
  
        // Handle error response here (e.g., display error message)
      }
    );
  }
  showSuccessNotification(message, duration = 3000) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.padding = '10px 20px';
  notification.style.backgroundColor = 'green';
  notification.style.color = 'white';
  notification.style.borderRadius = '5px';
  notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  notification.style.zIndex = '9999';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, duration);
}
  onFileSelected(event: any, type: string) {
    if (type === 'certificateFile') {
      this.formData.certificateFile = event.target.files[0];
    } else if (type === 'cvFile') {
      this.formData.cvFile = event.target.files[0];
    }
    
  }
 

  resetFormData() {
    this.formData = {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      adressUser: '',
      dateNaiss: '',
      sexe: '',
      certificateFile: null,
      cvFile: null
    };
  }
  onClose() {
    this.close.emit();
  }
  closeModal() {
    if (this.modalRef !== null) {
      this.modalRef.close(); 
    }
  }
  onCancel() {
    this.dialogRef.close();
    
  }

}