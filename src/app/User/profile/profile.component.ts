import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from 'src/models/user';
import { RegisterService } from 'src/app/Services/register.service';
import { ProfileRequest } from 'src/models/ProfileRequest';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {
 
    idUser!: number; // Assuming you get the idUser from the route or another source
    profileRequest: ProfileRequest = new ProfileRequest();
    user! :User;
    constructor(
      private route: ActivatedRoute,
      private userService: UserService
    ) { }
  
    ngOnInit(): void {
      // Retrieve user ID from route parameters
      const userId = this.route.snapshot.params['id'];
      // Fetch user data based on the ID from the backend
      this.userService.retrieveUser(userId).subscribe(
        (userData) => {
          this.user = userData; // Assign fetched user data to the user object
        },
        (error) => {
          console.error('Error fetching user data:', error);
          // Handle error, show error message, etc.
        }
      );
    }
  
    updateProfile(): void {
      this.userService.manageProfile(this.idUser, this.profileRequest)
        .subscribe(response => {
          console.log('Profile updated successfully:', response);
          // Handle success, maybe navigate to another page or show a success message
        }, error => {
          console.error('Error updating profile:', error);
          // Handle error, maybe show an error message to the user
        });
    }

    updateUser(): void {
      this.userService.updateUser(this.user).subscribe(
        (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
          // Handle success, show confirmation message, etc.
        },
        (error) => {
          console.error('Error updating user:', error);
          // Handle error, show error message, etc.
        }
      );
    }
}
