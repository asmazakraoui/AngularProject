
export class User {
    id: number;
    nomUser: string;
    prenomUser: string;
    EmailUser: string;
    mdpUser: string;
    adressUser: string;
    numTel: number;
    imageUser: string;
    etat: boolean;
    religion: string; // Assurez-vous que cela correspond au type de religion utilisé dans votre backend
    sexe: string;
    dateNaiss: string; // Vous pouvez utiliser le type Date si vous le préférez
  
    // Ajoutez d'autres propriétés au besoin, en fonction des relations et des propriétés de l'entité User dans votre backend
  }
  