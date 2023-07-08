import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // User is logged in, redirect to another route (e.g., home)
      this.router.navigate(['/home']);
      return false;
    } else {
      // User is not logged in, allow access to the route
      return true;
    }
  }
}
