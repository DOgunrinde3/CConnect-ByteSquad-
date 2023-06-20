import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "./auth.service";



export const notLoggedInGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.isAuthenticated$.subscribe((isAuthenticated) => {
    if (!isAuthenticated) {
      return router.navigate(['/login']); // Replace '/home' with your desired redirect path
    }
    return true;
  });

};

export const loggedInGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.isAuthenticated$.subscribe((isAuthenticated) => {
    if (isAuthenticated) {
      return router.navigate(['/book']); // Replace '/home' with your desired redirect path
    }
    return true;
  });
};

