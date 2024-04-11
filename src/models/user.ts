import { Role } from './role'; // Adjust the path as per your project structure

export class User {
  id!: number;
  prenomUser!: string;
  nomUser!: string;
  password!: string;
  numTel!: string;
  emailUser!: string;
  adressUser!: string;
  imageUser!: string;
  etat!: boolean;
  religion!: TypeReligion;
  sexe!: string;
  dateNaiss!: Date;
  dateMort?: Date;
  accountConfirmed!:boolean // Optional property for date of death
  roles?: Role[];
}

export enum TypeReligion {
  Muslim = 'Muslim',
  Christian = 'Christian',
  Jewish = 'Jewish'
}
