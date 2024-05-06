import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegimealimentaireService } from '../../Services/regimealimentaire.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-regimealimentaire',
  templateUrl: './update-regimealimentaire.component.html',
  styleUrls: ['./update-regimealimentaire.component.css']
})
export class UpdateRegimealimentaireComponent {
  regimealimentaireForm!: FormGroup; 
  id: any;

  

  constructor(private formBuilder: FormBuilder, private regimealimentaireService: RegimealimentaireService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']; 
    this.regimealimentaireForm = this.formBuilder.group({
      typeRegime : ['', Validators.required],
     
      descriptionRegime:['', Validators.required]
    });
    this.getRegimeAlimentaireById(); 
  }

  getRegimeAlimentaireById() {
    this.regimealimentaireService.getRegimeAlimentaireById(this.id).subscribe((res) => {
      this.regimealimentaireForm.patchValue(res);
      console.log("get");
    });
  }

  updateRegimeAlimentaire(): void {
    console.log("update");
    console.log(this.regimealimentaireForm.value);
      this.regimealimentaireService.updateRegimeAlimentaire(this.id, this.regimealimentaireForm.value).subscribe(() => {
        alert("Diagnostic updated!");
        this.regimealimentaireForm.reset();
      }, error => {
        alert("An error occurred while updating Diagnostic.");
        console.error(error); 
      });
  }

}
