import { Component } from '@angular/core';
import { RegimeAlimentaire } from 'src/app/Models/HealthcareManag/regime alimentaire';
import { RegimealimentaireService } from 'src/app/services/regimealimentaire.service';

@Component({
  selector: 'app-all-regimealimentaire',
  templateUrl: './all-regimealimentaire.component.html',
  styleUrls: ['./all-regimealimentaire.component.css']
})
export class AllRegimealimentaireComponent {
  Regimealimentaire: RegimeAlimentaire[] = [];
  constructor(private RegimealimntaireService: RegimealimentaireService) { }

  ngOnInit(): void {
    this.loadRegimeAlimentaire();
  }

  loadRegimeAlimentaire(): void {
    this.RegimealimntaireService.getAllRegimeAlimentaire().subscribe(Regimealimentaire => {
      this.Regimealimentaire = Regimealimentaire;
    });
  }

  deleteRegimeAlimentaire(id:number): void {
    this.RegimealimntaireService.deleteRegimeAlimentaire(id).subscribe(() : void => {
      this.loadRegimeAlimentaire();
    });
  }

}
