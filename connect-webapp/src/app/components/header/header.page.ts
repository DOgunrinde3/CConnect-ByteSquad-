import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HeaderPage implements OnInit {
  isAuthenticated = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  routeToSignup(){
    this.router.navigate(["/signup-client"]);

  }


  routeToLogin(){
    this.router.navigate(["/login"]);
  }

  routeToHome(){
    this.router.navigate(["/book"]);
  }


}
