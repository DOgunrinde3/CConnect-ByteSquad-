import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {FooterPage} from "../footer/footer.page";
import { ActionSheetController } from '@ionic/angular';
import {StaffService} from "../../services/staff.service";
import {UserInformationService} from "../../services/user-information.service";
import {DoctorModel} from "../../model/doctor.model";
import {AppointmentModel} from "../../model/appointment.model";
import {UserModel} from "../../model/User.model";
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {StaffSignupClient} from "../staff-signup-client/staff-signup-client.page";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-doctor-bio',
  templateUrl: './doctor-bio.page.html',
  styleUrls: ['./doctor-bio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, FooterPage, ReactiveFormsModule, NgOptimizedImage],
})
export class DoctorBioPage implements OnInit, OnDestroy {
  isAuthenticated = false;
  editToggle: boolean = false;
  staff: DoctorModel;

  firstNameTemp: string = '';
  lastNameTemp: string = '';
  emailTemp: string = '';
  phoneNumberTemp: string = '';
  experienceTemp: string = '';
  serviceTemp: AppointmentTypeEnum[];
  photo = './assets/icon/defaultPic.jpg';

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  emailValid: boolean = true;
  phoneNumberValid: boolean = true;
  experienceValid: boolean = true;

  appointmentTypes = Object.values(AppointmentTypeEnum);

  loadingSubscription: Subscription[] = [];
  constructor(private authService: AuthService,
              private router: Router, //private actionSheetController: ActionSheetController,
              private userService: UserInformationService,
              private staffService:StaffService) {
  }

  ngOnInit() {
    this.loadingSubscription.push(this.userService.userInformation$.subscribe((staff) => {
      this.staff = staff;
      if (this.staff){
        this.isAuthenticated = true;
      }
    }));
  }

  validateFirstName() {
    this.firstNameValid = !!this.firstNameTemp;
  }

  validateLastName() {
    this.lastNameValid = !!this.lastNameTemp;
  }

  validateEmail() {
    this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailTemp);
  }

  validatePhoneNumber() {
    this.phoneNumberValid = /^\d{10}$/.test(this.phoneNumberTemp);
  }

  validateExperience() {
    this.experienceValid = /^\d{1,2}$/.test(this.experienceTemp);
  }

  update(staff: DoctorModel, fName: string, lName: string, email: string, pNumber: string, exp: string, service: AppointmentTypeEnum[]) {
    this.staff = staff;
    staff.firstName = fName;
    staff.lastName = lName;
    staff.email = email;
    staff.phoneNumber = pNumber;
    staff.experience = exp;
    staff.services = service;

    this.editToggle = false;

    this.userService.setUserInformation(staff);

    this.loadingSubscription.push(this.staffService.update(staff).subscribe((staff) => {
      this.staff.firstName = staff.firstName;
      this.staff.lastName = staff.lastName;
      this.staff.email = staff.email;
      this.staff.phoneNumber = staff.phoneNumber;
      this.staff.experience = staff.experience;
      this.staff.services = staff.services;
     }));
  }

  editMode() {
    if(this.editToggle) {
      this.firstNameTemp = this.staff?.firstName;
      this.lastNameTemp = this.staff?.lastName;
      this.emailTemp = this.staff?.email;
      this.phoneNumberTemp = this.staff?.phoneNumber;
      this.experienceTemp = this.staff?.experience;
      this.serviceTemp = this.staff?.services;
    }
  }

  ngOnDestroy(){
    this.loadingSubscription.forEach(s => s.unsubscribe());
  }
}
