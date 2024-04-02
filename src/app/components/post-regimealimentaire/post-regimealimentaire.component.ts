import { Component } from '@angular/core';
import { RegimealimentaireService } from 'src/app/services/regimealimentaire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegimeAlimentaire } from 'src/app/Models/HealthcareManag/regime alimentaire';
@Component({
  selector: 'app-post-regimealimentaire',
  templateUrl: './post-regimealimentaire.component.html',
  styleUrls: ['./post-regimealimentaire.component.css']
})
export class PostRegimealimentaireComponent {
  regimealimtaireForm : FormGroup;
  editingorder: RegimeAlimentaire | null = null;
constructor(private regimealimentaire: RegimealimentaireService ,
  private formBuilder:FormBuilder) {
    this.regimealimtaireForm = this.formBuilder.group({
     
      typeRegime: ['', Validators.required],
      descriptionRegime:['',Validators.required]
  });

  }
  addRegimeAlimentaire(): void {
    if (this.regimealimtaireForm .valid) {
      const newRegimeAlimtaire:  RegimeAlimentaire = this.regimealimtaireForm .value as RegimeAlimentaire;
      this.regimealimentaire.addRegimeAlimentaire(newRegimeAlimtaire).subscribe(
        () => {
          alert("Regime Alimentaire added successfully!");
          this.regimealimtaireForm.reset();
        },
        error => {
          alert("An error occurred while adding Regime alimntaire.");
          console.error(error);
        }
      );
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  }

}

