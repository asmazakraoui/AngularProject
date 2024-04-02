import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Diagnostic } from 'src/app/Models/HealthcareManag/Diagnostic';
import { DiagnosticService } from 'src/app/services/diagnostic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegimeAlimentaire } from 'src/app/Models/HealthcareManag/regime alimentaire';
import { RegimealimentaireService } from 'src/app/services/regimealimentaire.service';

@Component({
  selector: 'app-post-diagnostic',
  templateUrl: './post-diagnostic.component.html',
  styleUrls: ['./post-diagnostic.component.css']
})
export class PostDiagnosticComponent implements OnInit {
  
  diagnosticForm: FormGroup;
  options: string[] = ['Diabete', 'Tension','Oxygene'];
  regime: RegimeAlimentaire=new RegimeAlimentaire();
  diag:Diagnostic=new Diagnostic();

  constructor(
    private regimealimentaireservice : RegimealimentaireService,
    private diagnosticService: DiagnosticService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.diagnosticForm = this.formBuilder.group({
      typeDiagnostic: ['', Validators.required],
      dateDiag: ['', Validators.required],
      numDiag: ['', [Validators.required, Validators.min(0)]]
    });
  
  }

  ngOnInit(): void {
    
  }
  
  addDiagnostic(): void {
    if (this.diagnosticForm.valid) {
      const newDiagnostic: Diagnostic = this.diagnosticForm.value as Diagnostic;
      this.diagnosticService.addDiagnostic(newDiagnostic).subscribe(
        (res:Diagnostic) => {
          
          this.openSnackBar('Diagnostic added successfully!');
          this.diagnosticForm.reset();
          
          console.log(res.regimeAlimentaire.descriptionRegime);
         // if(this.regime= this.diagnosticService.getRegimeDiagnostic(newDiagnostic)!=null){
        //  const message = `Votre diagnostic est anormal et le régime alimentaire correspondant est : <span class="regime-description">${res.regimeAlimentaire.descriptionRegime}</span>`;
        const message = "Votre diagnostic est anormal et le régime alimentaire correspondant est :" +res.regimeAlimentaire.descriptionRegime;
            this.openSnackBar(message); 
         // }
        },
        error => {
          this.openSnackBar('An error occurred while adding Diagnostic.');
          console.error(error);
        }
      );
    } else {
      this.openSnackBar('Please fill in all the required fields correctly.');
    }
  }

  /*checkAndAlertAbnormalDiagnostic(diagnostic: Diagnostic): void {
   
    
    if (diagnostic.estAnormal()) {
      const message = `Votre diagnostic est anormal et le régime alimentaire correspondant est ${diagnostic.regimeAlimentaire}.`;
      this.openSnackBar(message);
    }
  }*/

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 10000 
    });
  }
}
