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
  selector: 'app-loginStaff',
  templateUrl: 'loginStaff.page.html',
  styleUrls: ['loginStaff.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, ReactiveFormsModule, NgIf, HeaderPage, FooterPage],
})
export class LoginStaffPage implements OnInit {
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


  routeToLogin(){
    this.router.navigate(["/login"]);
  }

  routeToSignup(){
    this.router.navigate(["/signup-staff"]);
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
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


  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLoginInformation = this.loginForm.getRawValue() as LoginModel;

    this.authService.login(userLoginInformation, true);

  }
}
