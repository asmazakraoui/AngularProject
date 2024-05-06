import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { healthcare } from 'src/app/model/Healthcare';
import { HealthcareService } from '../../Services/healthcare.service';
@Component({
  selector: 'app-post-healthcare',
  templateUrl: './post-healthcare.component.html',
  styleUrls: ['./post-healthcare.component.css']
})
export class PostHealthcareComponent {
  healthcareForm : FormGroup;
  editingorder: healthcare | null = null;
constructor(private healthcareService: HealthcareService ,
  private formBuilder:FormBuilder) {
    this.healthcareForm = this.formBuilder.group({
      illness : ['', Validators.required],
      DescriptionH: ['', Validators.required],
      DateDesc:['',Validators.required]
  });

  }
  addHealthcare(): void {
    if (this.healthcareForm.valid) {
      const newHealthcare: healthcare = this.healthcareForm.value as healthcare;
      this.healthcareService.addHealthcare(newHealthcare).subscribe(
        () => {
          alert("Healthcare added successfully!");
          this.healthcareForm.reset();
        },
        error => {
          alert("An error occurred while adding healthcare.");
          console.error(error);
        }
      );
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  }

}
