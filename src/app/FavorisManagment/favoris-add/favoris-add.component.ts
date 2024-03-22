import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { Favoris } from 'src/app/models/favoris';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-favoris-add',
  templateUrl: './favoris-add.component.html',
  styleUrls: ['./favoris-add.component.css']
})
export class FavorisAddComponent {
  favorisForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private favorisService : FavorisServiceService){
    this.favorisForm = this.formBuilder.group({
    nomFav: ['', Validators.required],
    nbfav : ['', Validators.required]
    });
  }

  addFavoris(): void {
    if (this.favorisForm.valid){
      const newFavoris : Favoris = { ...this.favorisForm.value};

      this.favorisService.addFavoris(newFavoris).subscribe(()=>{
        alert("Favoris Added");
        this.favorisForm.reset();
      },
      error => {
        alert("An error occurred while adding Favoris ");
        console.error(error);
      }
      );
    } else {
      alert("Please fill in all the required fields");
    }
  }

  cancelEdit(): void {
    this.favorisForm.reset();
  }
 


}
