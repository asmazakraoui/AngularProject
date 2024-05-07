import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facebook-callback',
  template: '<p>Redirecting...</p>',
})
export class FacebookCallbackComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Make a request to your server to handle the Facebook callback
    this.http
      .get<any>('http://localhost:8082/test/testtest/auth/login/oauth2/code/facebook')
      .subscribe(
        (response) => {
          // Handle successful authentication, if needed
          console.log('Authentication successful');
          // Redirect to the desired location
          this.router.navigate(['/dashFront']);
        },
        (error) => {
          // Handle authentication error
          console.error('Authentication failed:', error);
          // Redirect to the login page or display an error message
          this.router.navigate(['/login']);
        }
      );
  }
}
