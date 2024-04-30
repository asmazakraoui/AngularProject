import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';
import { JobApplication } from 'src/models/JobApplication';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css'],
  providers: [MessageService, ConfirmationService]
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
  doctors: JobApplication[] = [];

  jobApplicationId:number;
  constructor(private messageService:MessageService,private confirmationService:ConfirmationService,private userService: UserService, private router: Router,private registerService:RegisterService) {}

  ngOnInit(): void {
    this.retrieveUsers();
    this.retrieveDoctors();
  }
  onPageChange(page: number): void {
    console.log('Page changed:', page);
    this.currentPage = page; // Update currentPage directly
    this.retrieveUsers(); // Fetch data for the new page
  }
  
  retrieveDoctors(): void {
    this.userService.retrieveDoctors().subscribe(
      (data: JobApplication[]) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
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

  


  editUser(userId: number): void {
    this.router.navigate(['/update', userId]);
  }
  confirmJobApplication(id: number): void {
    this.registerService.confirmJobApplication(id).subscribe(
      response => {
        console.log('Job application confirmed successfully:', response);
        // Handle success, maybe show a success message to the user
      },
      error => {
        console.error('An error occurred while confirming job application:', error);
        // Handle error, maybe show an error message to the user
      }
    );
  }
  

  deleteUser(user: User) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this User?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.deleteUser(user.id).subscribe(() : void => {
            this.retrieveUsers();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          });
            //@ts-ignore
            this.post = {};
        }
    });
  }
  
  postDialog: boolean = false;
  

  submitted: boolean = false;

  
  hideDialog() {
    this.postDialog = false;
    this.submitted = false;
  }
}