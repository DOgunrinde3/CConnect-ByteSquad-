 import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, NavController, Platform} from '@ionic/angular';
 import {AuthService} from "../../services/auth.service";
 import {UserInformationService} from "../../services/user-information.service";
 import {UserInformationModel} from "../../model/user-information.model";
 import {UserLoginModel} from "../../model/user-login.model";
 import {CompanyModel} from "../../model/company.model";
 import {CompanyInformationService} from "../../services/company-information.service";
 import {UserRegistrationModel} from "../../model/user-registration.model";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterUserPage implements OnInit {

  userRegistrationForm: FormGroup;
  companyInformation: CompanyModel;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private navCtrl: NavController,
              private companyInformationService: CompanyInformationService,
              private userInformationService: UserInformationService) {

  }

  ngOnInit(){
    this.userRegistrationForm = this.formBuilder.group({
      password: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        bio: ['', [Validators.maxLength(50)]]

    });

    this.getCompanyInfo();

  }

  getCompanyInfo(){
    this.companyInformationService.companyInformation$.subscribe(
      value => {

        if (value != null) {
          this.companyInformation = value
        }
      },
      error => {
        // Handle errors if necessary
      }
    );

  }


  get email() {
    return this.userRegistrationForm.get('email');
  }

  get password() {
    return this.userRegistrationForm.get('password');
  }


  get phoneNumber() {
    return this.userRegistrationForm.get('phoneNumber');
  }

  get bio() {
    return this.userRegistrationForm.get('bio');
  }

  get firstName() {
    return this.userRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.userRegistrationForm.get('lastName');
  }



  // passwordMatch(): boolean {
  //   return this.password?.value !== this.confirmPassword?.value;
  // }

  register(): void {

    const formValue =  this.userRegistrationForm.getRawValue();


    const userRegistrationInformation: UserRegistrationModel = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      password: formValue.password,
      companyCode: this.companyInformation?.companyCode,
      bio: formValue.bio,
      isAdmin: true,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email
    }

    // @ts-ignore
    // Perform registration logic here
    this.authService.registerUser(userRegistrationInformation).subscribe(
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
  }


}
