import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserModel} from "../model/User.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {DoctorModel} from "../model/doctor.model";
import jwt_decode from "jwt-decode";
import {ToastController} from "@ionic/angular";


const BASE_URI = 'http://localhost:8080/api/v1/auth/user';

@Injectable({
  providedIn: 'root'
})

export class UserInformationService {

  // @ts-ignore
  private userInformationSubject = new BehaviorSubject<any>(null);
  // @ts-ignore
  userInformation$ = this.userInformationSubject.asObservable();


  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastController: ToastController) {

  }

  setUserInformation(userInformation: any) {
    this.userInformationSubject.next(userInformation);
  }


  getUserInformation() {
   const token = localStorage.getItem('token');
    // @ts-ignore
    const decodedToken: any = jwt_decode(token);

      if(token !== null) {
  const userInfo$ = this.http.get<any>(`${BASE_URI}/${decodedToken.sub}?role=${decodedToken.role}`);
  userInfo$.subscribe(userInfo => { this.setUserInformation(userInfo);}, error=>{
    this.authService.logout();
    this.presentToast("top", error.error, 'danger', 'close-outline');
  } );
  }
      else { this.authService.logout()}
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
