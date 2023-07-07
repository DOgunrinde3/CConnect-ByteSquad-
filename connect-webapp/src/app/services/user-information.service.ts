import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserModel} from "../model/User.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {DoctorModel} from "../model/doctor.model";


const BASE_URI = 'http://localhost:8080/api/v1/auth/user';

@Injectable({
  providedIn: 'root'
})

export class UserInformationService {

  // @ts-ignore
  private userInformationSubject = new BehaviorSubject<UserModel>(null);
  // @ts-ignore
  private staffInformationSubject = new BehaviorSubject<DoctorModel>(null);
  userInformation$ = this.userInformationSubject.asObservable();
  staffInformation$ = this.staffInformationSubject.asObservable();


  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  setUserInformation(userInformation: UserModel) {
    this.userInformationSubject.next(userInformation);
  }

  setStaffInformation(staffInformation: DoctorModel) {
    this.staffInformationSubject.next(staffInformation);
  }

  getUserInformation() {
   const userId = localStorage.getItem('userId');
      if(userId !== null) {
  const userInfo$ = this.http.get<UserModel>(`${BASE_URI}/${userId}`);
  userInfo$.subscribe(userInfo => { this.setUserInformation(userInfo);}, error=>{
    this.authService.logout();
  } );
        }
      else { this.authService.logout()}
  }

  getStaffInformation() {
    const doctorId = localStorage.getItem('doctorId');
    if(doctorId !== null) {
      const userInfo$ = this.http.get<UserModel>(`${BASE_URI}/${doctorId}`);
      userInfo$.subscribe(userInfo => { this.setUserInformation(userInfo);}, error=>{
        this.authService.logout();
      } );
    }
    else { this.authService.logout()}
  }

}
