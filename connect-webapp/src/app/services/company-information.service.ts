import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserModel} from "../model/User.model";
@Injectable({
  providedIn: 'root'
})
export class CompanyInformationService {
  // @ts-ignore
  private companyInformationSubject = new BehaviorSubject<CompanyModel>(null);
  companyInformation$ = this.companyInformationSubject.asObservable();


}
