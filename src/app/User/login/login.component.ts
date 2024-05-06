import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../Services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { TypeRole } from 'src/models/role';
import { GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { UserService } from 'src/app/Services/user.service';
import { TokenDto } from 'src/models/TokenDto';


declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {}; 
  gapi:any;
  loginForm: FormGroup;
currentUser:User;
errorMessage: string = '';
gapiLoaded: boolean = false;
socialUser: SocialUser;
userLogged: SocialUser;
isLogged: boolean;
isSuspended: boolean;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder,private router:Router,private http: HttpClient,private authService: SocialAuthService,private service:UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  checkUserRole(user: any): void {
    if (user && user.roles && user.roles.some(role => role.roleName === TypeRole.ADMIN)) {
      // User is an admin, allow access to admin path
      console.log('User is an admin.');
      this.router.navigate(['/admin']);
    } else {
      // User is not an admin, restrict access to admin path
      console.error('Access denied. User is not an admin.');
      // Handle access denied
    }
  }
  loginUser() {
    if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;

        this.registerService.login(email, password).subscribe(
            (response: any) => {
                localStorage.setItem('accessToken', response.accessToken);

                this.registerService.getCurrentUser().subscribe(
                    (user: User) => {
                        this.registerService.setUser(user);
                        console.log('User:', user);

                        if (user && user.roles) {
                            const isAdmin = user.roles.some(role => role.roleName === TypeRole.ADMIN);
                            if (isAdmin) {
                                console.log('User is an admin. Redirecting to /admin');
                                this.router.navigate(['/admin']);
                            } else {
                                console.log('User is not an admin. Redirecting to /dashFront');
                                this.router.navigate(['/dashFront']);
                            }
                        } else {
                            console.error('User roles not found.');
                        }
                    },
                    (error) => {
                        console.error('Failed to get current user:', error);
                        // Handle error
                    }
                );
            },
            (error) => {
                console.error('Login failed:', error);
                if (error && error.error && error.error.errorMessage) {
                    if (error.error.errorMessage === "Your account is suspended. Please try again later.") {
                        this.isSuspended = true;
                    } else {
                        this.errorMessage = error.error.errorMessage;
                    }
                } else {
                    // Handle other errors or display a generic error message
                    this.errorMessage = "An unexpected error occurred. Please try again later.";
                }
            }
        );
    } else {
        console.log("Form invalid");
        this.loginForm.markAllAsTouched();
    }
}

  
  redirectToResetPassword(): void {
    this.router.navigate(['/reset-password']); // Navigate to the reset password route
  }
  
  

 
  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.isLogged= (this.registerService.isLoggedIn() && this.registerService.getAccessToken() != null);
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.registerService.google(tokenGoogle).subscribe(
          res => {
            this.registerService.loginUserToken(res.value);
            this.isLogged = true;
            this.router.navigate(['/dashFront']);
          },
          err => {
            console.log(err);
            this.registerService.logout();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

}
