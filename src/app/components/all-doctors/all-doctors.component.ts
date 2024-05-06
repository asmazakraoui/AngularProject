import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent {


  users: User[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDoctors(); 

}

getAllDoctors(): void {

  this.userService.getAllDoctors().subscribe(
    (data: any[]) => {
      console.log('Doctor data received:', data); 
      
      if (Array.isArray(data) && data.length > 0) {
        this.users = data.map((userData: any) => ({
          id: userData.id,
          prenomUser: userData.prenomUser,
          nomUser: userData.nomUser,
          emailUser: userData.emailUser,
          password: userData.mdpUser,
          numTel: userData.numTel,
          adressUser: userData.adressUser, 
          imageUser: userData.imageUser,
          etat: userData.etat,
          religion: userData.religion,
          sexe: userData.sexe,
          dateNaiss: new Date(userData.dateNaiss), 
          dateMort: userData.dateMort,
          accountConfirmed:userData.accountConfirmed,
          roles: userData.roles 
        }));
        

      } else {
        console.error('Empty or invalid doctor data received.');
      }

    },
    (error) => {
      console.error('Error fetching doctors:', error);
    }
  );
}

getImageUrl(user: User): string {
  return `http://localhost/images/${user.imageUser}`;
}

get filteredUsers(): User[] {
  return this.users.filter((user) =>
    user.prenomUser.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    user.nomUser.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

}
