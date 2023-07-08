import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, NavController, Platform, ToastController} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {UserInformationService} from "../../services/user-information.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {UserRegistrationModel} from "../../model/user-registration.model";
import {FooterPage} from "../footer/footer.page";
import {HeaderPage} from "../header/header.page";

@Component({
  selector: 'app-signup-client',
  templateUrl: 'signup-client.page.html',
  styleUrls: ['signup-client.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule, NgIf, FooterPage, HeaderPage]
})
export class SignupClient implements OnInit {


  userRegistrationForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private navCtrl: NavController,
              private userInformationService: UserInformationService,
              private toastController: ToastController) {



  }

  ngOnInit(){
    this.userRegistrationForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]]

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

  get birthdate() {
    return this.userRegistrationForm.get('birthdate');
  }



  // passwordMatch(): boolean {
  //   return this.password?.value !== this.confirmPassword?.value;
  // }

  register(): void {

    const userRegistrationInformation =  this.userRegistrationForm.getRawValue() as UserRegistrationModel;

    // @ts-ignore
    // Perform registration logic here
    this.authService.registerUser(userRegistrationInformation).subscribe(
      () =>{
      },
      error => {
        this.presentToast("top", error.error, 'danger', 'close-outline');
        // Handle errors if necessary
      }, () => {
        this.presentToast("top", 'Registration successful!', 'success', "checkmark-outline");

        this.platform.ready().then(() => {
          this.navCtrl.navigateRoot('/login');
        });
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
