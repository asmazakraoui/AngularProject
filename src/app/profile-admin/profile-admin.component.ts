import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private userService: RegisterService) { }

  ngOnInit(): void {
    const editButton = document.getElementById('edit-button');
    if (editButton) {
      editButton.addEventListener('click', () => {
        // Handle edit button click (e.g., toggle an edit form)
      });
    }
  
    this.getCurrentUserProfile();
    
  }
  getImageUrl(user: User): string {
    return `http://localhost/images/${user.imageUser}`;
  }
  getCurrentUserProfile(): void {
    if (this.userService.isLoggedIn()) {
      this.userService.getCurrentUser().subscribe(
        (user: User) => {
          this.currentUser = user;
        },
        (error) => {
          console.error('Error fetching current user profile:', error);
        }
      );
    } else {
      console.error('User is not logged in.');
    }
  }

}
