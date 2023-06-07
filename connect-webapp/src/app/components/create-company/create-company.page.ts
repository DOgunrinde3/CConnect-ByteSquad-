import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, NavController, Platform} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {UserInformationService} from "../../services/user-information.service";
import {UserLoginModel} from "../../model/user-login.model";
import {CompanyRegistrationModel} from "../../model/company-registration.model";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.page.html',
  styleUrls: ['./create-company.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateCompanyPage implements OnInit {
  registrationForm: FormGroup;
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private navCtrl: NavController,
              private userInformationService: UserInformationService) {

  }

  ngOnInit(){
    this.registrationForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      userLoginInfo: this.formBuilder.group({
        password: ['', [Validators.required]],
      }),
      userInfo: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required]],
        bio: ['', [Validators.maxLength(50)]]
      })
    });
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }


  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get bio() {
    return this.registrationForm.get('bio');
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get companyName() {
    return this.registrationForm.get('companyName');
  }

  // passwordMatch(): boolean {
  //   return this.password?.value !== this.confirmPassword?.value;
  // }

  register(): void {
    // if (this.registrationForm.invalid || this.passwordMatch()) {
    //   return;
    // }
    const formValue =  this.registrationForm.getRawValue() ;

    console.log(formValue.userLoginInfo.password);

    // @ts-ignore
    const userLoginInfo: UserLoginModel = {
      username: null,
      password: formValue.userLoginInfo.password,
      companyCode: null,
      userInfo: formValue.userInfo
    }

    const companyRegistration: CompanyRegistrationModel = {
      companyName: formValue.companyName,
      userLoginInfo: userLoginInfo,

    }



    // Perform registration logic here
    this.authService.createCompany(companyRegistration).subscribe(
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
