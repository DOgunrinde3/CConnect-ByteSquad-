import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController, ViewWillEnter} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import{UserInformationService} from "../../services/user-information.service";
import { NavController, Platform } from '@ionic/angular';

import {LoginModel} from "../../model/Login.model";
import {Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {FooterPage} from "../footer/footer.page";
import {async} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, ReactiveFormsModule, NgIf, HeaderPage, FooterPage],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isAuthenticated = false;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private userInformationService: UserInformationService,
              private toastController: ToastController) {

  }

  ngOnInit(){

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLoginInformation = this.loginForm.getRawValue() as LoginModel;

    this.authService.login(userLoginInformation).subscribe(
      (value) =>{
        this.authService.setAuthenticationState(true, value.userId);
        this.userInformationService.setUserInformation(value);

          this.router.navigate(["/bio"]);

        this.presentToast("top", 'Login successful!', 'success',"checkmark-outline");


      },
      error => {
          this.presentToast("top", error.message, 'danger', 'close-outline');
        // Handle errors if necessary
      }

    );
    // You can send a request to your backend for authentication
    // and handle the response accordingly
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: any, color: any, icon) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color:color

    });

    await toast.present();
  }
}
