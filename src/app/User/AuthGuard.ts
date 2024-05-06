import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { RegisterService } from "../Services/register.service";
import { Observable,of } from "rxjs";
import {  catchError,map } from 'rxjs/operators';
import { TypeRole } from "src/models/role";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    
    constructor(private authService: RegisterService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    canAcced(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.getCurrentUser().pipe(
        map(user => {
          if (!user) {
            // User not available, redirect to login
            this.router.navigate(['/login']);
            return false;
          }
          // Check if the user has the required role
          const requiredRole = route.data && route.data['requiredRole'];
          return Array.isArray(user.roles) && user.roles.some(role => role.roleName === requiredRole);
        }),
        catchError(() => {
          // Error occurred while fetching user data, redirect to dashboard or any other route
          this.router.navigate(['/dashFront']);
          return of(false);
        })
      );
    }
    
    
  }
  