import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController, NavController, Platform, ToastController} from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {UserInformationService} from "../../services/user-information.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserRegistrationModel} from "../../model/user-registration.model";
import {FooterPage} from "../footer/footer.page";
import {HeaderPage} from "../header/header.page";
import {ConfirmAppointmentPage} from "../confirm-appointment/confirm-appointment.page";
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {StaffRegistrationModel} from "../../model/staff-registration.model";

@Component({
  selector: 'app-signup-client',
  templateUrl: 'staff-signup-client.page.html',
  styleUrls: ['staff-signup-client.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule, NgIf, FooterPage, HeaderPage, NgForOf]
})
export class StaffSignupClient implements OnInit {


  staffRegistrationForm: FormGroup;

  appointmentTypes = Object.values(AppointmentTypeEnum);


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private navCtrl: NavController,
              private userInformationService: UserInformationService,
              private toastController: ToastController) {



  }

  ngOnInit(){
    this.staffRegistrationForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      services: ['', [Validators.required]],


    });

  }



  get email() {
    return this.staffRegistrationForm.get('email');
  }

  get password() {
    return this.staffRegistrationForm.get('password');
  }


  get phoneNumber() {
    return this.staffRegistrationForm.get('phoneNumber');
  }

  get bio() {
    return this.staffRegistrationForm.get('bio');
  }

  get firstName() {
    return this.staffRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.staffRegistrationForm.get('lastName');
  }

  get birthdate() {
    return this.staffRegistrationForm.get('birthdate');
  }

  get experience() {
    return this.staffRegistrationForm.get('experience');
  }

  get services() {
    return this.staffRegistrationForm.get('services');
  }



  // passwordMatch(): boolean {
  //   return this.password?.value !== this.confirmPassword?.value;
  // }

  register(): void {

    const staffRegistrationInformation =  this.staffRegistrationForm.getRawValue() as StaffRegistrationModel;

    // Perform registration logic here
    this.authService.registerStaff(staffRegistrationInformation).subscribe(
      (value) => {
        this.userInformationService.setStaffInformation(value);

      },
      error => {
        this.presentToast("top", error.message, 'danger', 'close-outline');
        // Handle errors if necessary
      }, () => {
        this.presentToast("top", 'Registration successful!', 'success',"checkmark-outline");

        this.platform.ready().then(() => {
          this.navCtrl.navigateRoot('/book');
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
