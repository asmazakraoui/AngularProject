import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favoris-upp',
  templateUrl: './favoris-upp.component.html',
  styleUrls: ['./favoris-upp.component.css']
})
export class FavorisUppComponent implements OnInit {

  favorisForm!: FormGroup;
  id: any;

  constructor(private formBuilder: FormBuilder, private favorisService : FavorisServiceService, private activateRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.favorisForm= this.formBuilder.group({
      nomFav: ['', Validators.required],
      nbfav : ['', Validators.required]
    });
    
  }

  updateFavoris(): void {
    this.favorisService.updateFavoris(this.id, this.favorisForm.value).subscribe(()=>{
      alert("Favoris Updated");
      this.favorisForm.reset();
    });
  }

}
