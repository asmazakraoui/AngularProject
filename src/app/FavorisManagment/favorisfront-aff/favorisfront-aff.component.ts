import { Component, OnInit } from '@angular/core';
import { Favoris } from 'src/app/models/favoris';
import { FavorisServiceService } from '../ServiceFavoris/favoris-service.service';
import { Podcast } from 'src/app/models/podcast';
import { MatDialog } from '@angular/material/dialog';
import { FavorisUppComponent } from '../favoris-upp/favoris-upp.component';
import { FavorisfrontAddComponent } from '../favorisfront-add/favorisfront-add.component';

@Component({
  selector: 'app-favorisfront-aff',
  templateUrl: './favorisfront-aff.component.html',
  styleUrls: ['./favorisfront-aff.component.css']
})
export class FavorisfrontAffComponent implements OnInit {
  favoriss: Favoris[] = [];
  podcasts: Podcast[] = [];

  constructor(private favorisService: FavorisServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();
    if (userId) {
      this.loadFavorisByUserId(userId);
    }
  }

  loadFavorisByUserId(userId: number): void {
    this.favorisService.getFavorisByIdduser(userId).subscribe(
      (favoriss: Favoris[]) => {
        this.favoriss = favoriss;
      },
      (error) => {
        console.error('Error fetching Favoris:', error);
      }
    );
  }

  deleteFavoris(id: number): void {
    this.favorisService.deleteFavoris(id).subscribe(() => {
      this.loadFavorisByUserId(this.getUserIdFromLocalStorage());
    });
  }


  getUserIdFromLocalStorage(): number {
    const id = localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0;
  }

  openUpdateFavoris(favori: Favoris): void {
    const dialogRef = this.dialog.open(FavorisUppComponent, {
      data: { favori: favori }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  openAddFavoris(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(FavorisfrontAddComponent , {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        empcode: code
      },
      panelClass: 'center-dialog'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        console.log(result)
        //// ajout loadfavoris
      }
    });
  }


}


