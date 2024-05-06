import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

  users: User[] = [];
  
  searchTerm: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveUsers(); 

}

retrieveUsers(): void {

  this.userService.retrieveUsers().subscribe(
    (data: any[]) => {
      console.log('User data received:', data); 
      
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
        console.error('Empty or invalid user data received.');
      }

    },
    (error) => {
      console.error('Error fetching users:', error);
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
