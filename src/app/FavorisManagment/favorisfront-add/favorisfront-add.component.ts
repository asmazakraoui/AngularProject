import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { Favoris } from 'src/app/models/favoris';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-favorisfront-add',
  templateUrl: './favorisfront-add.component.html',
  styleUrls: ['./favorisfront-add.component.css']
})
export class FavorisfrontAddComponent {
  favorisForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private favorisService : FavorisServiceService,
    public dialogRef : MatDialogRef<FavorisfrontAddComponent> ){
    this.favorisForm = this.formBuilder.group({
    nomFav: ['', Validators.required],
   
    });
  }
  addFavoris(): void {
    if (this.favorisForm.valid){
      const newFavoris : Favoris = { ...this.favorisForm.value,
        idduser: this.getUserIdFromLocalStorge()
      };

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
  
  getUserIdFromLocalStorge():number {
    const id= localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0 ;
    }

    
  onCancel() {
    this.dialogRef.close();
    
  }

}
