import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, NavController, Platform} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {UserInformationService} from "../../services/user-information.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CompanyInformationService} from "../../services/company-information.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup-client',
  templateUrl: 'signup-client.page.html',
  styleUrls: ['signup-client.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule, NgIf]
})
export class SignupClient implements OnInit {


  userRegistrationForm: FormGroup;

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
