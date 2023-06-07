import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {UserLoginModel} from "../model/user-login.model";
import {CompanyRegistrationModel} from "../model/company-registration.model";

const BASE_URI = 'http://localhost:8080/api/v1/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  constructor(private http: HttpClient) {
  }

  login(loginDetails: UserLoginModel): Observable<UserModel>{
      return this.http.post<UserModel>(`${BASE_URI}/login`, loginDetails);
  }

  createCompany(companyRegistration: CompanyRegistrationModel): Observable<any>{
    return this.http.post<any>(`${BASE_URI}/create-company`, companyRegistration );
  }
}
