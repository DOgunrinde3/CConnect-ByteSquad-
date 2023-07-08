import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController, ViewWillEnter} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import{UserInformationService} from "../../services/user-information.service";
import {StaffService} from "../../services/staff.service";
import { NavController, Platform } from '@ionic/angular';
import {DoctorModel} from "../../model/doctor.model";
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
  showPassword = false;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private userInformationService: UserInformationService,
              private staffService: StaffService,
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

  getName(){
   return this.showPassword ? 'eye-outline' : 'eye-off-outline'
  }

  getType(){
    return this.showPassword ? 'text' : 'password'
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
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
        console.log(value);
      },
      (error) => {
        console.log(error);
        console.log(error);
          this.presentToast("top", error.message, 'danger', 'close-outline');
        // Handle errors if necessary
      }, () => {
        this.router.navigate(["/home"]);
        this.presentToast("top", 'Login successful!', 'success',"checkmark-outline");

      }

    );


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
