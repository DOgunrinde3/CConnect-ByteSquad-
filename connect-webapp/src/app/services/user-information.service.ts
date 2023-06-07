import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserInformationModel} from "../model/user-information.model";

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  // @ts-ignore
  private userInformationSubject = new BehaviorSubject<UserInformationModel>(null);
  userInformation$ = this.userInformationSubject.asObservable();

  setUserInformation(userInformation: UserInformationModel) {
    this.userInformationSubject.next(userInformation);
  }
}
