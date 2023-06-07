import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, NavController, Platform} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {UserInformationService} from "../../services/user-information.service";
import {UserLoginModel} from "../../model/user-login.model";
import {CompanyModel} from "../../model/company.model";
import {UserInformationModel} from "../../model/user-information.model";
import {CompanyInformationService} from "../../services/company-information.service";

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
              private companyInformationService: CompanyInformationService) {

  }

  ngOnInit(){
    this.registrationForm = this.formBuilder.group({
      companyName: ['', [Validators.required]]
    });
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
    const companyRegistration =  this.registrationForm.getRawValue() as CompanyModel;

    // Perform registration logic here
    this.authService.createCompany(companyRegistration).subscribe(
      (value) =>{

        this.companyInformationService.setCompanyInformation(value)

        this.platform.ready().then(() => {
          this.navCtrl.navigateRoot('/register-user');
        });

      },
      error => {
        // Handle errors if necessary
      }

    );
  }

}
