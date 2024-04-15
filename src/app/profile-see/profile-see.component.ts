import { Component, OnInit } from '@angular/core';

import { UserService } from '../Services/user.service';
import { User } from 'src/models/user';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-profile-see',
  templateUrl: './profile-see.component.html',
  styleUrls: ['./profile-see.component.css']
})
export class ProfileSeeComponent implements OnInit{
  currentUser: User | null = null;

  constructor(private userService: RegisterService) { }

  ngOnInit(): void {
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
