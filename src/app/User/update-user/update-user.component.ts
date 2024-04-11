import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/models/user'; // Adjust the path as per your file structure



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
 
  user: User = new User(); // Initialize with default values or fetch from backend

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
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
