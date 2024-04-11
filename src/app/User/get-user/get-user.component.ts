import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {
  users: User[] = [];
  keyword: string = '';
  sortedByDOB: boolean = false; // Track sorting state
  sortedAlphabetically: boolean = false; // Track sorting state
  currentPage = 1;
  pageSize = 3;
  totalElements = 100;
  field = 'firstName';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveUsers(); // Load users initially
  }
  onPageChange(page: number): void {
    console.log('Page changed:', page);
    this.currentPage = page; // Update currentPage directly
    this.retrieveUsers(); // Fetch data for the new page
  }
  
 
retrieveUsers(): void {
  console.log('Fetching users for page:', this.currentPage);
  this.userService.retrieveUsers().subscribe(
    (data: any[]) => {
      console.log('User data received:', data); // Log the received user data
      // Check if data is an array and not empty
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
          dateNaiss: new Date(userData.dateNaiss), // Parse dateNaiss into a Date object
          dateMort: userData.dateMort,
          accountConfirmed:userData.accountConfirmed,
          roles: userData.roles // Assuming roles are properly formatted
        }));
        this.totalElements = data.length; // Update totalElements based on the fetched data

      } else {
        console.error('Empty or invalid user data received.');
      }

    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}
sortUsersByDateOfBirth(): void {
  this.sortedByDOB = !this.sortedByDOB; // Toggle sorting state
  // Sort users by date of birth
  this.users.sort((a, b) => {
    const dateA = a.dateNaiss.getTime();
    const dateB = b.dateNaiss.getTime();
    return this.sortedByDOB ? dateA - dateB : dateB - dateA; // Ascending or descending
  });
}

sortUsersAlphabetically(): void {
  this.sortedAlphabetically = !this.sortedAlphabetically; // Toggle sorting state
  // Sort users alphabetically by first name
  this.users.sort((a, b) => {
    const nameA = a.prenomUser.toLowerCase();
    const nameB = b.prenomUser.toLowerCase();
    return this.sortedAlphabetically ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA); // Ascending or descending
  });
}


  searchUsers(): void {
    if (this.keyword.trim()) {
      this.userService.searchUsers(this.keyword).subscribe(
        (data: any[]) => {
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
            dateNaiss: new Date(userData.dateNaiss), // Parse dateNaiss into a Date object
            dateMort: userData.dateMort,
            accountConfirmed:userData.accountConfirmed,
            roles: userData.roles // Assuming roles are properly formatted
          }));
        },
        (error) => {
          console.error('Error searching users:', error);
        }
      );
    } else {
      this.retrieveUsers(); // Reload all users if keyword is empty
    }
  }
  getImageUrl(user: User): string {
    return `http://localhost/images/${user.imageUser}`;
  }

  


  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully.');
        // After deletion, refresh the user list
        this.retrieveUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(userId: number): void {
    this.router.navigate(['/update', userId]);
  }
}