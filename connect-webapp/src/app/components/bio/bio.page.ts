import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ViewWillEnter, ViewWillLeave} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {FooterPage} from "../footer/footer.page";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.page.html',
  styleUrls: ['./bio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, FooterPage]
})
export class BioPage implements OnInit {
  isAuthenticated = false;
  editToggle: boolean = false;

  firstNameTemp: string = '';
  lastNameTemp: string = '';
  emailTemp: string = '';
  phoneNumberTemp: string = '';
  genderTemp: string = '';

  firstName: string = 'John';
  lastName: string = 'Doe'
  email: string = 'john.doe@example.com';
  phoneNumber: string = '+1 123-456-7890';
  gender: string = 'Male';
  photo = './assets/icon/defaultPic.jpg';
  constructor(private authService: AuthService,
              private router: Router, private actionSheetController: ActionSheetController) {

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnInit() {
  }

  async editImg() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
          }
        },
        {
          text: 'Update',
          icon: 'create',
          handler: () => {
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await actionSheet.present();
  }

  saveInformation() {
    // Save logic here
    this.firstName = this.firstNameTemp;
    this.lastName = this.lastNameTemp;
    this.email = this.emailTemp;
    this.phoneNumber = this.phoneNumberTemp;
    this.gender = this.genderTemp;
    this.editToggle = false;
  }

  editMode() {
    if(this.editToggle) {
      this.firstNameTemp = this.firstName;
      this.lastNameTemp = this.lastName;
      this.emailTemp = this.email;
      this.phoneNumberTemp = this.phoneNumber;
      this.genderTemp = this.gender;
    }
  }
}
