import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {FooterPage} from "../footer/footer.page";
import { ActionSheetController } from '@ionic/angular';
import {UserInformationService} from "../../services/user-information.service";
import {UserModel} from "../../model/User.model";
import {AppointmentModel} from "../../model/appointment.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, FooterPage, ReactiveFormsModule, NgOptimizedImage],
})
export class BioPage implements OnInit, OnDestroy {
  isAuthenticated = false;
  editToggle: boolean = false;
  user: UserModel;

  firstNameTemp: string = '';
  lastNameTemp: string = '';
  emailTemp: string = '';
  phoneNumberTemp: string = '';
  photo = './assets/icon/defaultPic.jpg';

  firstNameValid: boolean = true;
  lastNameValid: boolean = true;
  emailValid: boolean = true;
  phoneNumberValid: boolean = true;

  loadingSubscription: Subscription[] = [];


  constructor(private authService: AuthService,
              private router: Router, //private actionSheetController: ActionSheetController,
              private userService: UserInformationService) {
  }

  ngOnInit() {
    this.loadingSubscription.push(this.userService.userInformation$.subscribe((user) => {
      this.user = user;

      if (this.user){
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


  update(user: UserModel, fName: string, lName: string, email: string, pNumber: string) {
    this.user = user;
    user.firstName = fName;
    user.lastName = lName;
    user.email = email;
    user.phoneNumber = pNumber;

    this.editToggle = false;

    this.loadingSubscription.push(this.userService.update(user).subscribe((user) => {
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
      this.user.phoneNumber = user.phoneNumber;
    }));
  }

  editMode() {
    if(this.editToggle) {
      this.firstNameTemp = this.user?.firstName;
      this.lastNameTemp = this.user?.lastName;
      this.emailTemp = this.user?.email;
      this.phoneNumberTemp = this.user?.phoneNumber;
    }
  }

  ngOnDestroy(){
    this.loadingSubscription.forEach(s => s.unsubscribe());
  }
}
