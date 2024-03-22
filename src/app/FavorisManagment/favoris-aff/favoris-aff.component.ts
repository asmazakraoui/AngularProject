import { Component, OnInit } from '@angular/core';
import { Favoris } from 'src/app/models/favoris';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';

@Component({
  selector: 'app-favoris-aff',
  templateUrl: './favoris-aff.component.html',
  styleUrls: ['./favoris-aff.component.css']
})
export class FavorisAffComponent implements OnInit{
  favoriss : Favoris[]= [];

  constructor(private favorisService: FavorisServiceService){}



  ngOnInit(): void {
    this.loadFavoris();
  }

  loadFavoris(): void {
    this.favorisService.getAllFavoris().subscribe(
      (favoriss: Favoris[]) => {
        this.favoriss = favoriss ;
      },
      (error) => {
        console.error('Error fetching Favoris:', error);
      }
        );
      }

      deleteFavoris(id: number): void {
        this.favorisService.deleteFavoris(id).subscribe((): void =>{
          this.loadFavoris();
        })
      }
  }


