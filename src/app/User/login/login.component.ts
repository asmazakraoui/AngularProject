import { Component } from '@angular/core';
import { RegisterService } from '../../Services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {}; 
  loginForm: FormGroup;

  constructor(private registerService: RegisterService, private formBuilder: FormBuilder,private router:Router,private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Extract email and password from the form
      this.registerService.login(email, password).subscribe(
        (response: any) => {
          console.log('User logged in successfully!', response);
          console.log('data', { email, password });
           // Store access token in local storage
          localStorage.setItem('accessToken', response.accessToken);
  
          // Redirect to dashboard if the username is admin@gmail.com
          if (email === 'rayenpatron58@gmail.com') {
            this.router.navigate(['/admin']); // Redirect to the dashboard route
          } else {
            // For other users, proceed normally to showProfile
            this.registerService.loginUserToken(response.accessToken);
            this.registerService.getCurrentUser().subscribe(
              (user: any) => {
                this.registerService.setUser(user);
                console.log(user);
                this.router.navigate(['/dashFront']);
              }
            );
          }
        },
        (error) => {
          console.error('Login failed:', error);
          if (error && error.error && error.error.errorMessage) {
            alert(error.error.errorMessage); // Display suspension message
          }
        }
      );
    } else {
      console.log("Form invalid");
      // You can also mark all fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }
  
  redirectToResetPassword(): void {
    this.router.navigate(['/reset-password']); // Navigate to the reset password route
  }

  loginWithFacebook() {
    // Faites une requête HTTP GET vers votre backend pour rediriger l'utilisateur vers l'URL d'authentification Facebook
    this.http.get<any>('http://localhost:8082/test/auth/facebook').subscribe(
      response => {
        console.log('Redirection vers Facebook effectuée avec succès');
        // Gérez la réponse si nécessaire (par exemple, afficher un message à l'utilisateur)
      },
      error => {
        console.error('Erreur lors de la redirection vers Facebook:', error);
        // Gérez l'erreur si nécessaire (par exemple, afficher un message d'erreur)
      }
    );
  }
}
