import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Diagnostic } from 'src/app/model/Diagnostic';
import { TypeDiagnostic } from 'src/app/model/TypeDiagnostic';
import { DiagnosticService } from '../../Services/diagnostic.service';

@Component({
  selector: 'app-update-diagnostic',
  templateUrl: './update-diagnostic.component.html',
  styleUrls: ['./update-diagnostic.component.css']
})
export class UpdateDiagnosticComponent implements OnInit {
  diagnosticForm!: FormGroup; 
  id: any;
  typeDiagnosticOptions: string[] = Object.values(TypeDiagnostic);
  

  constructor(private formBuilder: FormBuilder, private diagnosticService: DiagnosticService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']; 
    this.diagnosticForm = this.formBuilder.group({
      dateDiag : ['', Validators.required],
      numDiag: ['', [Validators.required, Validators.min(0)]],
      typeDiagnostic:['', Validators.required]
    });
    this.getDiagnosticById(); 
  }

  getDiagnosticById() {
    this.diagnosticService.getDiagnosticById(this.id).subscribe((res) => {
      this.diagnosticForm.patchValue(res);
      console.log("get");
    });
  }

  updateDiagnostic(): void {
    console.log("update");
    console.log(this.diagnosticForm.value);
      this.diagnosticService.updateDiagnostic(this.id, this.diagnosticForm.value).subscribe(() => {
        alert("Diagnostic updated!");
        this.diagnosticForm.reset();
      }, error => {
        alert("An error occurred while updating Diagnostic.");
        console.error(error); 
      });
  }
}