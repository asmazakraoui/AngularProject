import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Favoris } from 'src/app/models/favoris';

@Component({
  selector: 'app-favoris-upp',
  templateUrl: './favoris-upp.component.html',
  styleUrls: ['./favoris-upp.component.css']
})
export class FavorisUppComponent implements OnInit {
  favori!: Favoris;
  favorisForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private favorisService: FavorisServiceService,
    public dialogRef: MatDialogRef<FavorisUppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { favori: Favoris }
  ) { }

  ngOnInit(): void {
    this.favori = this.data.favori;
    this.initializeForm();
  }

  initializeForm(): void {
    this.favorisForm = this.formBuilder.group({
      nomFav: [this.favori.nomFav, Validators.required]
    });
  }

  // updateFavoris(): void {
  //   if (this.favorisForm.valid) {
  //     const updatedFavori: Favoris = {
  //       idFav: this.favori.idFav,
  //       nomFav: this.favorisForm.value.nomFav,
  //       nbfav: this.favori.nbfav, // Assuming you're not updating this field
  //       visibilite: this.favori.visibilite, // Assuming you're not updating this field
  //       idduser: this.favori.idduser // Assuming you're not updating this field
  //     };

  //     this.favorisService.updateFavoris(this.favori.idFav, updatedFavori).subscribe(() => {
  //       alert("Favoris Updated");
  //       this.dialogRef.close();
  //     });
  //   }
  // }

  updateNomFavoris(): void {
    if (this.favorisForm.valid) {
      const updatedNomFavori = this.favorisForm.value.nomFav;

      this.favorisService.updateNomFavoris(this.favori.idFav, updatedNomFavori).subscribe(() => {
        alert("Nom Favoris Updated");
        this.dialogRef.close();
      });
    }
  }


  onCancel() {
    this.dialogRef.close();
  }
}


