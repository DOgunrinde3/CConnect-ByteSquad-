import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, NavController, Platform} from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {UserInformationService} from "../../services/user-information.service";

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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      bio: ['', [Validators.maxLength(50)]]
    });
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get bio() {
    return this.registrationForm.get('bio');
  }

  passwordMatch(): boolean {
    return this.password?.value !== this.confirmPassword?.value;
  }

  register(): void {
    if (this.registrationForm.invalid || this.passwordMatch()) {
      return;
    }

    // Perform registration logic here
    console.log('Registration successful!', this.registrationForm.value);
  }

}
