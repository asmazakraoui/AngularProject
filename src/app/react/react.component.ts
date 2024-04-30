//import { React, TypeReact } from './../models/react';
import { Component, EventEmitter } from '@angular/core';
//import { React } from '../models/react';
import { ReactService } from '../Services/react.service';
//import { TypeReact } from './React'; // Assurez-vous que le chemin est correct
//import { TypeReact } from './TypeReact.enum';




@Component({
  selector: 'app-react',
  templateUrl: './react.component.html',
  styleUrls: ['./react.component.css']
})
export class ReactComponent {
  idPost: number;

  constructor(private reactService: ReactService) { }
/*
  addReact(typeReactString: string) {
    let typeReact: TypeReact;

    // Mappez le string reçu au type d'enum correspondant
    if (typeReactString === 'like') {
      typeReact = TypeReact.like;
    } else if (typeReactString === 'dislike') {
      typeReact = TypeReact.dislike;
    } else {
      // Gérez les cas où le type de réaction n'est pas valide
      console.error('Type de réaction non valide : ', typeReactString);
      return;
    }
    const newReact: React = {
      idReact: null, // Laissez le backend générer l'ID
     // typeReact: typeReact
    };

    // Appel de la méthode addReact du service ReactService
    this.reactService.likePost(newReact,this.idPost).subscribe(
      (response) => {
        console.log('Réaction ajoutée avec succès : ', response);
        // Mettez à jour l'interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réaction : ', error);
        // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }*/
}
