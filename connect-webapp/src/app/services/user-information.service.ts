import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserModel} from "../model/User.model";

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  // @ts-ignore
  private userInformationSubject = new BehaviorSubject<UserModel>(null);
  userInformation$ = this.userInformationSubject.asObservable();

  setUserInformation(userInformation: UserModel) {
    this.userInformationSubject.next(userInformation);
  }
}
