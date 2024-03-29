import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController, ViewWillEnter} from '@ionic/angular';
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
  imports: [IonicModule, FormsModule, ReactiveFormsModule, NgIf, HeaderPage, FooterPage],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isAuthenticated = false;
  showPassword = false;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router
  ) {

  }

  ngOnInit(){

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isStaff:[false]
    });


}

  get email() {
    return this.loginForm.get('email');
  }

  getName(){
   return this.showPassword ? 'eye-outline' : 'eye-off-outline'
  }

  routeToStaffLogin(){
    this.router.navigate(["/signup-staff"]);
  }

  routeToSignup(){
    this.router.navigate(["/signup"]);
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

  get isStaff() {
    return this.loginForm.get('isStaff');
  }



  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLoginInformation = this.loginForm.getRawValue() as LoginModel;

    this.authService.login(userLoginInformation, this.isStaff.getRawValue());

  }


}
