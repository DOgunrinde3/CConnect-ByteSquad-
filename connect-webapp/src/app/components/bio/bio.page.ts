import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BioPage implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
  }




}
