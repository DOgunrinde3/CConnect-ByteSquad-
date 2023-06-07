import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserInformationModel} from "../model/user-information.model";
import {CompanyModel} from "../model/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyInformationService {
  // @ts-ignore
  private companyInformationSubject = new BehaviorSubject<CompanyModel>(null);
  companyInformation$ = this.companyInformationSubject.asObservable();

  setCompanyInformation(companyInformation: CompanyModel) {
    this.companyInformationSubject.next(companyInformation);
  }
}
