import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorisfront-upp',
  templateUrl: './favorisfront-upp.component.html',
  styleUrls: ['./favorisfront-upp.component.css']
})
export class FavorisfrontUppComponent implements OnInit{
  
  favorisForm!: FormGroup;
  id: any;
  constructor(private formBuilder: FormBuilder, private favorisService : FavorisServiceService, private activateRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.favorisForm= this.formBuilder.group({
      nomFav: ['', Validators.required],
      nbfav : ['', Validators.required]
    });
    this.favorisService.getFavorisById(this.id).subscribe(
      (fav: any)=> {
        this.favorisForm.patchValue({
          nomFav: fav.nomFav,
          nbfav : fav.nbfav
        })
      }
    )
  }
  // updateFavoris(): void {
  //   this.favorisService.updateFavoris(this.id, this.favorisForm.value).subscribe(()=>{
  //     alert("Favoris Updated");
  //     this.favorisForm.reset();
  //   });
  // }

  updateFavoris(): void {
    const updatedNomFav = this.favorisForm.get('nomFav')?.value; // Récupérer la valeur de nomFav du formulaire
  
    // Vérifier si la valeur de nomFav a été modifiée
    if (updatedNomFav !== null && updatedNomFav !== undefined) {
      // Appeler le service pour mettre à jour uniquement nomFav
      this.favorisService.updateNomFavoris(this.id, updatedNomFav).subscribe(() => {
        alert("NomFav Updated");
        this.favorisForm.reset();
      });
    }
  }
}
