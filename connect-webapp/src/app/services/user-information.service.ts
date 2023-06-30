import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserModel} from "../model/User.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";


const BASE_URI = 'http://localhost:8080/api/v1/auth/user';

@Injectable({
  providedIn: 'root'
})

export class UserInformationService {

  // @ts-ignore
  private userInformationSubject = new BehaviorSubject<UserModel>(null);
  userInformation$ = this.userInformationSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  setUserInformation(userInformation: UserModel) {
    this.userInformationSubject.next(userInformation);
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

}
