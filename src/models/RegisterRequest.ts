export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  mobileNumber: string;
  email: string;
  addressUser?: string; // Marked as optional using '?'
  imageUser?: string;   // Similarly for other optional properties
  etat?: boolean;
  religion?: string;
  sexe?: string;
  dateNaiss?: Date;
  dateMort?: Date;
  
}
