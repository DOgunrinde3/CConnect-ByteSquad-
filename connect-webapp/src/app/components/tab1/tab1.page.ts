import {Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {UserLoginModel} from "../../model/user-login.model";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, ReactiveFormsModule, NgIf],
})
export class Tab1Page implements OnInit {
  loginForm: FormGroup;



  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      companyCode: ['', Validators.required]
    });
}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userLoginInformation = this.loginForm.getRawValue() as UserLoginModel;

    this.authService.login(userLoginInformation).subscribe((value) => console.log(value));


    // You can send a request to your backend for authentication
    // and handle the response accordingly
  }
}
