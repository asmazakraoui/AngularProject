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
  editMode: boolean = false;
  editedUser: User = new User();
imageUser:null;
formData: FormData = new FormData();

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

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode && this.currentUser) {
      // When entering edit mode, clone currentUser to editedUser
      this.editedUser = { ...this.currentUser };
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append('image', file);
    }
  }
  
  saveChanges(): void {
    if (this.editedUser && this.formData.has('image')) {
      const { nomUser, prenomUser, numTel, adressUser, sexe } = this.editedUser;
      this.userService.updateCurrentUser(
        nomUser,          // lastName
        prenomUser,       // firstName
        numTel,           // mobileNumber
        adressUser,       // adressUser
        sexe,             // sexe
        this.formData.get('image') as File // pass the File object from FormData
      ).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          // Update currentUser with editedUser's values
          this.currentUser = { ...this.editedUser };
          this.editMode = false;
        },
        (error) => {
          console.error('Error updating profile:', error);
          // Handle error
        }
      );
    } else {
      console.error('Image is required.');
      // Handle error - Inform the user that an image is required
    }
  }
  
  
 
}
