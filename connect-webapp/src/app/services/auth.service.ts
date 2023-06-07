import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserInformationModel} from "../model/user-information.model";
import {UserLoginModel} from "../model/user-login.model";
import {CompanyModel} from "../model/company.model";
import {UserRegistrationModel} from "../model/user-registration.model";

const BASE_URI = 'http://localhost:8080/api/v1/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private http: HttpClient) {
  }

  login(loginDetails: UserLoginModel): Observable<UserInformationModel>{
      return this.http.post<UserInformationModel>(`${BASE_URI}/login`, loginDetails);
  }
  createCompany(companyRegistration: CompanyModel): Observable<any>{
    return this.http.post<any>(`${BASE_URI}/create-company`, companyRegistration);
  }

  registerUser(userRegistration: UserRegistrationModel): Observable<UserInformationModel>{
    return this.http.post<UserInformationModel>(`${BASE_URI}/register-user`, userRegistration);
  }
}
