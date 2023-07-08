import {inject, Injectable} from '@angular/core';
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import { AuthService} from "../auth.service";


@Injectable({
  providedIn: 'root'
})

export class UserAuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // User is logged in, allow access to the route
      return true;
    } else {
      // User is not logged in, redirect to the login page or any desired route
      this.router.navigate(['/login']);
      return false;
    }
  }

}


