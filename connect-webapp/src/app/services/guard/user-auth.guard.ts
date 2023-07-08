import {inject, Injectable} from '@angular/core';
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import { AuthService} from "../auth.service";


@Injectable({
  providedIn: 'root'
})

export class UserAuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && !this.authService.isStaff()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}


