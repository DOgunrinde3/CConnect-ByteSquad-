import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import{UserInformationService} from "../../services/user-information.service";
import { NavController, Platform } from '@ionic/angular';

import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {UserLoginModel} from "../../model/user-login.model";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, ReactiveFormsModule, NgIf],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private navCtrl: NavController,
              private userInformationService: UserInformationService) {

  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      companyCode: ['', Validators.required]
    });
}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  createCompany(): void{
    this.platform.ready().then(() => {
      this.navCtrl.navigateRoot('/create-company');
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLoginInformation = this.loginForm.getRawValue() as UserLoginModel;

    this.authService.login(userLoginInformation).subscribe(
      (value) =>{

        this.userInformationService.setUserInformation(value)

        this.platform.ready().then(() => {
          this.navCtrl.navigateRoot('/home');
        });

      },
      error => {
        // Handle errors if necessary
      }

    );
    // You can send a request to your backend for authentication
    // and handle the response accordingly
  }
}
